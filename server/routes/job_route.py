from flask import Blueprint, request, jsonify
from services.genai_service import parse_job_description

bp = Blueprint("job_route", __name__)

@bp.route("/parse-job", methods=["POST"])
def parse_job():
    data = request.json
    job_description = data.get("job_description", "")

    if not job_description:
        return jsonify({"error": "Job description is required"}), 400

    result = parse_job_description(job_description)
    return jsonify(result)