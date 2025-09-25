from flask import Flask, render_template, send_from_directory, jsonify
import os
import json

app = Flask(__name__)

# Configure static files
app.static_folder = '.'
app.template_folder = '.'

@app.route('/')
def index():
    """Serve the main index.html page"""
    return send_from_directory('.', 'index.html')

@app.route('/config.json')
def config():
    """Serve the config.json file"""
    try:
        with open('config.json', 'r', encoding='utf-8') as f:
            config_data = json.load(f)
        return jsonify(config_data)
    except FileNotFoundError:
        return jsonify({"error": "Config file not found"}), 404
    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON in config file"}), 400

@app.route('/styles.css')
def styles():
    """Serve the CSS file"""
    return send_from_directory('.', 'styles.css', mimetype='text/css')

@app.route('/script.js')
def script():
    """Serve the JavaScript file"""
    return send_from_directory('.', 'script.js', mimetype='application/javascript')

@app.route('/static/<path:filename>')
def static_files(filename):
    """Serve any additional static files"""
    return send_from_directory('.', filename)

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({"error": "File not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    print("🌊 Water Depletion Project Server Starting...")
    
    # Get port from environment variable (Railway sets this)
    port = int(os.environ.get('PORT', 5000))
    
    # Check if we're in production (Railway sets RAILWAY_ENVIRONMENT)
    is_production = os.environ.get('RAILWAY_ENVIRONMENT') is not None
    
    if not is_production:
        print("📱 Open your browser and go to: http://localhost:5000")
        print("🔄 Press Ctrl+C to stop the server")
        print("-" * 50)
        
        # Check if required files exist (only in development)
        required_files = ['index.html', 'styles.css', 'script.js', 'config.json']
        missing_files = []
        
        for file in required_files:
            if not os.path.exists(file):
                missing_files.append(file)
        
        if missing_files:
            print(f"⚠️  Warning: Missing files: {', '.join(missing_files)}")
        else:
            print("✅ All required files found!")
        
        print("-" * 50)
    else:
        print("🚀 Running in production mode on Railway")
        print(f"🌐 Port: {port}")
    
    # Run the Flask app
    app.run(
        host='0.0.0.0',
        port=port,
        debug=not is_production,  # Disable debug in production
        use_reloader=not is_production  # Disable reloader in production
    )
