# Gemini Text Generator

## Installation

1. Install the required dependencies:
```bash
# Create virtual environment
python3 -m venv myenv

# Activate virtual environment
source myenv/bin/activate

# pip install all the requirements
pip install flask flask-cors google-generativeai python-dotenv
```

3. Create a `.env` file in the project root and add your Google API key:
```env
GOOGLE_API_KEY=your_api_key_here
```