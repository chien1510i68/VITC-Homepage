import re

file_path = r"d:\VITC-WEB\vitc-homepage\app\data\courses.ts"

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Templates for different course types
benefits_chung_chi = '''benefitsHtml: `<div style="line-height: 1.6;">
      <div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0284c7;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e;"><strong>Chứng chỉ quốc tế:</strong> Được công nhận tại 150+ quốc gia</p>
      </div>
      <div style="background: linear-gradient(to right, #f0fdf4, #dcfce7); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <p style="margin: 0; font-size: 13px; color: #14532d;"><strong>Học phí ưu đãi:</strong> Bao gồm lệ phí thi chứng chỉ</p>
      </div>
      <div style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ca8a04;">
        <p style="margin: 0; font-size: 13px; color: #713f12;"><strong>Tài liệu:</strong> Giáo trình chuẩn quốc tế</p>
      </div>
      <div style="background: linear-gradient(to right, #fce7f3, #fbcfe8); padding: 12px; border-radius: 8px; border-left: 3px solid #be185d;">
        <p style="margin: 0; font-size: 13px; color: #831843;"><strong>Hỗ trợ:</strong> Tư vấn miễn phí sau khóa học</p>
      </div>
    </div>`'''

benefits_ky_nang_mem = '''benefitsHtml: `<div style="line-height: 1.6;">
      <div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0284c7;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e;"><strong>Chứng nhận:</strong> Chứng chỉ hoàn thành khóa học</p>
      </div>
      <div style="background: linear-gradient(to right, #f0fdf4, #dcfce7); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <p style="margin: 0; font-size: 13px; color: #14532d;"><strong>Thực hành:</strong> 70% thời lượng thực hành</p>
      </div>
      <div style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ca8a04;">
        <p style="margin: 0; font-size: 13px; color: #713f12;"><strong>Tài liệu:</strong> Tài liệu học tập đầy đủ</p>
      </div>
      <div style="background: linear-gradient(to right, #fce7f3, #fbcfe8); padding: 12px; border-radius: 8px; border-left: 3px solid #be185d;">
        <p style="margin: 0; font-size: 13px; color: #831843;"><strong>Cộng đồng:</strong> Tham gia nhóm học tập</p>
      </div>
    </div>`'''

benefits_cong_nghe = '''benefitsHtml: `<div style="line-height: 1.6;">
      <div style="background: linear-gradient(to right, #f0f9ff, #e0f2fe); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #0284c7;">
        <p style="margin: 0; font-size: 13px; color: #0c4a6e;"><strong>Chứng nhận:</strong> Chứng chỉ hoàn thành từ VITC</p>
      </div>
      <div style="background: linear-gradient(to right, #f0fdf4, #dcfce7); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #16a34a;">
        <p style="margin: 0; font-size: 13px; color: #14532d;"><strong>Dự án thực tế:</strong> Thực hành với dự án thực tế</p>
      </div>
      <div style="background: linear-gradient(to right, #fef3c7, #fde68a); padding: 12px; border-radius: 8px; margin-bottom: 10px; border-left: 3px solid #ca8a04;">
        <p style="margin: 0; font-size: 13px; color: #713f12;"><strong>Công cụ:</strong> Phần mềm & tài liệu chuyên sâu</p>
      </div>
      <div style="background: linear-gradient(to right, #fce7f3, #fbcfe8); padding: 12px; border-radius: 8px; border-left: 3px solid #be185d;">
        <p style="margin: 0; font-size: 13px; color: #831843;"><strong>Tư vấn:</strong> Hỗ trợ học tập 1-1</p>
      </div>
    </div>`'''

# Step 1: Remove all malformed benefitsHtml entries
content = re.sub(r'\s+benefitsHtml: `<div style=""[^`]*`', '', content)

# Step 2: Fix missing commas and closing braces
content = re.sub(r'(description: `[^`]+`)\s+}\s+}\s+{', r'\1\n    }\n  },\n  {', content)

# Step 3: Find all course blocks and add benefitsHtml before the closing brace
# Map course codes to their benefit templates
course_benefits_map = {
    'ICDL-2025': benefits_chung_chi,
    'UDCNTT-COBAN-2025': benefits_chung_chi,
    'UDCNTT-NANGCAO-2025': benefits_chung_chi,
    'IC3-2025': benefits_chung_chi,
    'MOS-2025': benefits_chung_chi,
    'MOS-QUOCTE-2025': benefits_chung_chi,
    'CNTT-DAURA-2025': benefits_chung_chi,
    'KNM-GIAOTIEP-2025': benefits_ky_nang_mem,
    'KNM-TEAMWORK-2025': benefits_ky_nang_mem,
    'KNM-BANTHAN-2025': benefits_ky_nang_mem,
    'KNM-VIECLAM-2025': benefits_ky_nang_mem,
    'KNM-LANHDAO-2025': benefits_ky_nang_mem,
    'KNM-QUOCTE-2025': benefits_ky_nang_mem,
    'KNM-CV-2025': benefits_ky_nang_mem,
    'SEO-MARKETING-2025': benefits_cong_nghe,
    'EXCEL-SPSS-R-2025': benefits_cong_nghe,
    'EXCEL-KETOAN-2025': benefits_cong_nghe,
    'ARCGIS-WEBGIS-2025': benefits_cong_nghe,
    'MICROSTATION-2025': benefits_cong_nghe,
    'LAPTRINH-WEB-2025': benefits_cong_nghe,
}

# Add benefits to each course
for course_code, benefits_template in course_benefits_map.items():
    # Pattern: find the instructor closing brace and add benefitsHtml before the course closing brace
    pattern = r"(courseCode: '" + course_code + r"'.*?description: `[^`]+`\s+})\s+\}\}(,?)"
    replacement = r"\1\n    },\n    " + benefits_template + r"\n  }\2"
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# For courses not in the map, add default benefits (cong_nghe)
default_codes = ['PYTHON-COBAN-2025', 'MARKETING-COBAN-2025', 'AUTOCAD-2025', 
                 'REVIT-2025', 'SKETCHUP-2025']
for course_code in default_codes:
    pattern = r"(courseCode: '" + course_code + r"'.*?description: `[^`]+`\s+})\s+\}\}(,?)"
    replacement = r"\1\n    },\n    " + benefits_cong_nghe + r"\n  }\2"
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Write fixed content
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Đã sửa lại file courses.ts và thêm benefitsHtml cho tất cả khóa học!")
