import json
import random
import uuid

user_data_file = open("user_data.json")
list_of_user_data = json.load(user_data_file)

credential_list = []
username_dict = {}

for user in list_of_user_data:
    name_parts = user["Name"].split()
    username = ".".join(name_parts[:2])

    if username_dict.get(username):
        # username already taken
        username += str(random.randint(10, 99))

    username_dict[username] = True

    # uuid4 returns a text of this format:: a0b8c899-5401-4a80-93ce-695fb279b8a0
    # taking the first 8 characters for a password
    password = str(uuid.uuid4()).split('-')[0]

    credential_list.append({"username": username, "password": password})

output_file = open("user_credentials.json", "w")
json.dump(credential_list, output_file)
