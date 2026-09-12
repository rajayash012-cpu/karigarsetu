import os

filepath = os.path.join(os.path.dirname(__file__), 'data_part2.py')
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"descriptionHi: "', '"descriptionHi": "')
content = content.replace('"labourRate: ', '"labourRate": ')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleaned up data_part2.py")
