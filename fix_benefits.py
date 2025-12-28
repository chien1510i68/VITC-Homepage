import re

file_path = r"d:\VITC-WEB\vitc-homepage\app\data\courses.ts"

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all malformed benefitsHtml entries (they're in wrong place - inside instructor object)
content = re.sub(r'\s+benefitsHtml: `<div style=""[^`]*`\s+', '\n', content)

# Fix missing commas after instructor blocks
content = re.sub(r'(description: `[^`]+`\s+)\n    }\n  }(\n  {)', r'\1\n    }\n  },\2', content)

# Write fixed content
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed malformed benefitsHtml entries!")
