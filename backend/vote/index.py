'''
Business: API для голосования между командами и получения результатов
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with vote results
'''

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    '''Создает подключение к базе данных'''
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    try:
        # GET - получить результаты
        if method == 'GET':
            cursor.execute("SELECT team, COUNT(*) as votes FROM votes GROUP BY team")
            results = cursor.fetchall()
            
            votes_data = {'red': 0, 'blue': 0}
            for row in results:
                votes_data[row['team']] = row['votes']
            
            total = votes_data['red'] + votes_data['blue']
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'red': votes_data['red'],
                    'blue': votes_data['blue'],
                    'total': total,
                    'redPercent': round((votes_data['red'] / total * 100) if total > 0 else 0, 1),
                    'bluePercent': round((votes_data['blue'] / total * 100) if total > 0 else 0, 1)
                }),
                'isBase64Encoded': False
            }
        
        # POST - отдать голос
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            team = body_data.get('team')
            
            if team not in ['red', 'blue']:
                return {
                    'statusCode': 400,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Invalid team'}),
                    'isBase64Encoded': False
                }
            
            # Получаем IP из headers
            headers = event.get('headers', {})
            voter_ip = headers.get('X-Forwarded-For', headers.get('X-Real-IP', 'unknown'))
            
            # Сохраняем голос
            cursor.execute(
                "INSERT INTO votes (team, voter_ip) VALUES (%s, %s)",
                (team, voter_ip)
            )
            conn.commit()
            
            # Возвращаем обновленные результаты
            cursor.execute("SELECT team, COUNT(*) as votes FROM votes GROUP BY team")
            results = cursor.fetchall()
            
            votes_data = {'red': 0, 'blue': 0}
            for row in results:
                votes_data[row['team']] = row['votes']
            
            total = votes_data['red'] + votes_data['blue']
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'success': True,
                    'red': votes_data['red'],
                    'blue': votes_data['blue'],
                    'total': total,
                    'redPercent': round((votes_data['red'] / total * 100) if total > 0 else 0, 1),
                    'bluePercent': round((votes_data['blue'] / total * 100) if total > 0 else 0, 1)
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
