from flask import Flask, request, jsonify
from google.generativeai import GenerativeModel
import google.generativeai as genai
import os
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class GeminiTextGenerator:
    def __init__(self, api_key=None):
        """Initialize the Gemini text generator with API key."""
        self.api_key = api_key or os.getenv("GOOGLE_API_KEY")
        if not self.api_key:
            raise ValueError("Google API key is required")
        
        # Configure the Gemini API
        genai.configure(api_key=self.api_key)
        
        # Initialize the model
        self.model = GenerativeModel('gemini-pro')
        
        # Initialize Flask app
        self.app = Flask(__name__)
        CORS(self.app)
        
        # Register routes
        self.register_routes()
    
    def register_routes(self):
        """Register Flask routes."""
        self.app.route('/generate-text', methods=['POST'])(self.generate_text_endpoint)
        self.app.route('/analyze', methods=['POST'])(self.analyze_endpoint)
    
    async def generate_text(self, prompt, max_tokens=None, temperature=0.7):
        """Generate text using Gemini model."""
        try:
            response = await self.model.generate_content(
                prompt,
                generation_config={
                    'temperature': temperature,
                    'max_output_tokens': max_tokens if max_tokens else 2048,
                }
            )
            return response.text
        except Exception as e:
            print(f"Error generating text: {str(e)}")
            return None
    
    def generate_text_endpoint(self):
        """Flask endpoint for creative text generation with higher temperature."""
        data = request.json
        prompt = data.get('prompt', '')
        
        if not prompt:
            return jsonify({'error': 'Prompt is required'}), 400
        
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={
                    'temperature': 0.9,
                    'top_p': 0.9,
                    'top_k': 40
                }
            )
            return jsonify({
                'text': response.text,
                'status': 'success'
            })
        except Exception as e:
            return jsonify({
                'error': str(e),
                'status': 'error'
            }), 500
    
    def analyze_endpoint(self):
        """Flask endpoint for text analysis."""
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        try:
            response = self.model.generate_content(
                f"Analyze the following text and provide key insights: {text}"
            )
            return jsonify({
                'analysis': response.text,
                'status': 'success'
            })
        except Exception as e:
            return jsonify({
                'error': str(e),
                'status': 'error'
            }), 500
    
    def run(self, host='0.0.0.0', port=5000, debug=False):
        """Run the Flask application."""
        self.app.run(host=host, port=port, debug=debug)

# Example usage
if __name__ == '__main__':
    # Initialize and run the application
    generator = GeminiTextGenerator()
    generator.run(debug=True)