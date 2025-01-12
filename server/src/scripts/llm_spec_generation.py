import requests
import json

def download_open_api_spec():
    # Download the OpenAPI spec from the LLM servers
    url = "http://localhost:3001/api-json"
    response = requests.get(url)

    # save json to file location ./server/src/specs/llm_openapi_spec.json
    with open('./specs/llm_openapi_spec.json', 'w') as f:
        json_data = json.loads(response.text)
        json.dump(json_data, f, indent=4)


download_open_api_spec()

