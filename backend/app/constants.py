signin_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 8
        }
    },
    "required": ["email", "password"],
    "additionalProperties": False
}

signup_schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
        },
        "email": {
            "type": "string",
            "format": "email"
        },
        "password": {
            "type": "string",
            "minLength": 8
        },
        "manage_salt": {
            "type": "string",
        }
    },
    "required": ["email", "password", "name"],
    "additionalProperties": False
}

initialize_password_schema = {
    "type": "object",
    "properties": {
        "password": {
            "type": "string",
            "minLength": 8
        },
        "confirmPassword": {
            "type": "string",
            "minLength": 8
        },
    },
    "required": ["password", "confirmPassword"],
    "additionalProperties": False
}
