'''
Business: API для загрузки видео файлов на сервер
Args: event - dict with httpMethod, body (base64 encoded video)
      context - object with request_id
Returns: HTTP response with video URL
'''

import json
import base64
import os
import uuid
from typing import Dict, Any

UPLOAD_DIR = '/tmp/videos'

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    # CORS preflight
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        video_base64 = body_data.get('video')
        filename = body_data.get('filename', 'video.mp4')
        
        if not video_base64:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'No video data'}),
                'isBase64Encoded': False
            }
        
        # Create upload directory
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        
        # Generate unique filename
        video_id = str(uuid.uuid4())
        ext = filename.split('.')[-1] if '.' in filename else 'mp4'
        video_filename = f"{video_id}.{ext}"
        video_path = os.path.join(UPLOAD_DIR, video_filename)
        
        # Decode and save video
        video_data = base64.b64decode(video_base64)
        with open(video_path, 'wb') as f:
            f.write(video_data)
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'videoId': video_id,
                'filename': video_filename,
                'url': f'/videos/{video_filename}'
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
