from flask import Blueprint, request, jsonify
from services.genai_service import compare_job_and_resume

bp = Blueprint("compare_route", __name__)  # Create the Blueprint

@bp.route("/compare", methods=["POST"])
def compare():
    data = request.json
    job_json = data.get("job_json", {})
    resume_json = data.get("resume_json", {})

    if not job_json or not resume_json:
        return jsonify({"error": "Job and Resume JSON data are required"}), 400

    result = compare_job_and_resume(job_json, resume_json)
    return jsonify({"comparison": result})

