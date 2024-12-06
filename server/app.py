from flask import Flask
from flask_cors import CORS
from routes import job_route, resume_route, compare_route, feedback_route

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Register routes
    app.register_blueprint(job_route.bp)
    app.register_blueprint(resume_route.bp)
    app.register_blueprint(compare_route.bp)
    app.register_blueprint(feedback_route.bp)

    return app
 
 