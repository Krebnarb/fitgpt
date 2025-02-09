from flask import Blueprint
from ..services.helloService import get_hello_message

hello_bp = Blueprint('hello', __name__)

@hello_bp.route('/hello', methods=['GET'])
def hello():
    return get_hello_message()
