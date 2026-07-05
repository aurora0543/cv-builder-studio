#!/usr/bin/env python3
import json
import re
import sys
import argparse

class CVParser:
    def __init__(self):
        # Maps Chinese section titles to JSON keys
        self.sections_map = {
            "基本信息": "basic_info",
            "求职意向": "career_objective",
            "教育经历": "education",
            "是否有在职亲属": "has_working_relatives",
            "是否有工作经历": "has_work_experience",
            "项目经历": "projects",
            "学生干部经历": "student_leadership",
            "有无校内活动经历": "has_campus_activities",
            "语言能力": "languages",
            "其他技能/证书": "skills_and_certificates",
            "作品": "portfolio",
            "竞赛/获奖经历": "awards",
            "发明专利": "patents",
            "论文": "papers",
            "家庭成员": "family_members",
            "自我评价": "self_evaluation"
        }
        
    def parse_markdown(self, content: str) -> dict:
        data = {v: None for v in self.sections_map.values()}
        
        # Clean markdown comments
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        
        # Split by ## headers
        sections = re.split(r'\n##\s+', '\n' + content)
        
        for section in sections:
            section = section.strip()
            if not section:
                continue
                
            lines = section.split('\n')
            title = lines[0].strip()
            # Clean up potential markdown formatting in header
            title = re.sub(r'[#*`\s]', '', title).split('(')[0].split('（')[0]
            
            section_content = '\n'.join(lines[1:])
            
            json_key = None
            for key, val in self.sections_map.items():
                if key in title or title in key:
                    json_key = val
                    break
                    
            if not json_key:
                continue
                
            # Parse based on section type
            if json_key in ["basic_info", "career_objective"]:
                data[json_key] = self._parse_key_values(section_content)
            elif json_key in ["education", "projects", "student_leadership", "languages", "skills_and_certificates", "portfolio", "awards", "patents", "papers", "family_members"]:
                parsed_list = self._parse_list_section(json_key, section_content, data)
                if parsed_list:
                    data[json_key] = parsed_list
            elif json_key in ["has_working_relatives", "has_work_experience", "has_campus_activities"]:
                data[json_key] = "是" in section_content
            elif json_key == "self_evaluation":
                data[json_key] = section_content.strip().strip('*').strip()
                
        return data

    def _parse_key_values(self, content: str) -> dict:
        result = {}
        pattern_std_real = re.compile(r'^\s*-\s*\*\*(.*?)\*\*[:：]\s*(.*)$')
        for line in content.split('\n'):
            match = pattern_std_real.match(line)
            if match:
                k = match.group(1).strip()
                v = match.group(2).strip()
                eng_key = self._map_field_name(k)
                if eng_key:
                    if eng_key == "preferred_cities":
                        result[eng_key] = [c.strip() for c in re.split(r'[,/，、]', v) if c.strip()]
                    else:
                        result[eng_key] = v
        return result

    def _parse_list_section(self, section_name: str, content: str, root_data: dict) -> list:
        lines = [line.strip('\r') for line in content.split('\n')]
        items = []
        current_item = {}
        current_responsibilities = []
        in_responsibilities = False
        
        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
                
            is_sub_bullet = line.startswith(' ') or line.startswith('\t')
            match_real = re.match(r'^\s*-\s*\*\*(.*?)\*\*[:：]?\s*(.*)$', line)
            
            is_new_block = False
            if match_real and not is_sub_bullet:
                key = match_real.group(1).strip()
                val = match_real.group(2).strip()
                
                # Check for special root fields inside education list
                if section_name == "education" and key in ["是否有在职亲属", "是否有工作经历"]:
                    root_data[self._map_field_name(key)] = "是" in val
                    continue
                elif section_name == "student_leadership" and key == "有无校内活动经历":
                    root_data["has_campus_activities"] = "是" in val
                    continue
                
                if section_name == "awards":
                    # In new format, each award bullet represents an academic year with potentially multiple awards merged
                    # key is academic year range like "2020年09月 – 2021年09月"
                    # val is comma-separated list of awards: "优秀班干部，节能减排竞赛（校级）三等奖 (校级)，sdvdvs (校级)"
                    
                    # Extract single date (end of academic year)
                    date_val = ""
                    date_match = re.findall(r'(\d{4})[年.-](\d{2})[月]?$', key)
                    if date_match:
                        date_val = f"{date_match[0][0]}-{date_match[0][1]}"
                    else:
                        date_val = "2022-09" # default fallback
                        
                    # Split combined awards
                    raw_awards = [a.strip() for a in re.split(r'[，、,]', val) if a.strip()]
                    for raw_aw in raw_awards:
                        level_val = "校级"
                        name_val = raw_aw
                        # Look for level parenthesis (e.g. "(校级)", "(国家级)", "(省级)")
                        level_match = re.search(r'^(.*?)\s*[(（](校级|省级|国家级|市级|综合素质|学术技能)[)）]\s*$', raw_aw)
                        if level_match:
                            name_val = level_match.group(1).strip()
                            level_val = level_match.group(2).strip()
                            
                        items.append({
                            "name": name_val,
                            "date": date_val,
                            "level": level_val,
                            "category": "学术技能与综合素质"
                        })
                    continue
                
                # Check if it starts a new item block for other sections
                if section_name == "education" and key not in ["时间", "所在院系/研究所", "受教育类型", "专业课程", "该学历是否为交流学习", "该学历是否为联合办学", "专业类别", "专业", "学院", "成绩排名", "GPA", "学校所在地", "导师姓名", "是否国家重点实验室", "所在实验室"]:
                    is_new_block = True
                elif section_name == "projects" and key == "项目名称":
                    is_new_block = True
                elif section_name == "student_leadership" and key == "职位":
                    is_new_block = True
                elif section_name == "languages" and key == "语种":
                    is_new_block = True
                elif section_name == "skills_and_certificates" and key == "技能/证书名称":
                    is_new_block = True
                elif section_name == "portfolio" and key == "作品名称":
                    is_new_block = True
                elif section_name == "patents" and key == "专利名称":
                    is_new_block = True
                elif section_name == "papers" and key == "名称":
                    is_new_block = True
                elif section_name == "family_members" and key == "姓名":
                    is_new_block = True

            # If it's a new block, save the previous one and start a new dict
            if is_new_block:
                if current_item:
                    if current_responsibilities:
                        current_item["responsibilities"] = current_responsibilities
                        current_responsibilities = []
                    items.append(current_item)
                current_item = {}
                in_responsibilities = False
                
                key = match_real.group(1).strip()
                val = match_real.group(2).strip()
                if section_name == "education":
                    current_item["degree"] = key
                elif section_name == "projects":
                    current_item["name"] = val
                elif section_name == "student_leadership":
                    current_item["role"] = val
                elif section_name == "languages":
                    current_item["language"] = val
                elif section_name == "skills_and_certificates":
                    current_item["name"] = val
                elif section_name == "portfolio":
                    current_item["name"] = val
                elif section_name == "patents":
                    current_item["name"] = val
                elif section_name == "papers":
                    current_item["title"] = val
                elif section_name == "family_members":
                    current_item["name"] = val
                continue
                
            # Parse properties of current active block
            if match_real:
                key = match_real.group(1).strip()
                val = match_real.group(2).strip()
                eng_key = self._map_field_name(key)
                if eng_key:
                    if eng_key == "courses":
                        current_item[eng_key] = [c.strip() for c in re.split(r'[,，]', val) if c.strip()]
                    elif eng_key in ["is_exchange", "is_joint", "is_key_lab"]:
                        current_item[eng_key] = "是" in val
                    elif eng_key == "responsibilities":
                        in_responsibilities = True
                    else:
                        current_item[eng_key] = val
            elif in_responsibilities and (is_sub_bullet or line.strip().startswith('-')):
                bullet_match = re.match(r'^\s*-\s*(.*)$', line)
                if bullet_match:
                    current_responsibilities.append(bullet_match.group(1).strip())
            else:
                # Handle family members simplified format
                if section_name == "family_members" and not current_item:
                    fam_match = re.match(r'^-\s*([^：区域，]+)[：:]([^，]+)，工作单位[：:]([^，]+)，(?:职务|职业)[：:](.*)$', line)
                    if fam_match:
                        fam_member = {
                            "role": fam_match.group(1).strip(),
                            "name": fam_match.group(2).strip(),
                            "organization": fam_match.group(3).strip(),
                            "job": fam_match.group(4).strip()
                        }
                        items.append(fam_member)
        
        if current_item:
            if current_responsibilities:
                current_item["responsibilities"] = current_responsibilities
            items.append(current_item)
            
        return items

    def _map_field_name(self, chinese_name: str) -> str:
        mapping = {
            "姓名": "name", "性别": "gender", "出生日期": "birth_date", "联系电话": "phone",
            "电子邮箱": "email", "GitHub": "github", "github": "github", "LinkedIn": "linkedin",
            "linkedin": "linkedin", "个人主页": "homepage", "homepage": "homepage",
            "国籍（国家/地区）": "nationality", "国籍": "nationality",
            "籍贯": "native_place", "居住地": "residence", "政治面貌": "political_status",
            "最高学历": "highest_education", "英语等级": "english_level", "证件类型": "id_type",
            "证件号码": "id_number", "意向面试地点": "interview_location", "招聘信息获取来源": "source",
            "推荐码": "referral_code", "紧急联系人（姓名+电话）": "emergency_contact", "紧急联系人": "emergency_contact",
            "期望城市": "preferred_cities", "期望薪资": "expected_salary", "到岗时间": "onboard_time",
            "时间": "period", "起止时间": "period", "所在院系/研究所": "institution", "受教育类型": "enrollment_type",
            "专业课程": "courses", "该学历是否为交流学习": "is_exchange", "该学历是否为联合办学": "is_joint",
            "专业类别": "major_category", "专业": "major", "学院": "college", "专业排名": "ranking", "成绩排名": "ranking", "GPA": "gpa",
            "学校所在地": "location", "导师姓名": "advisor", "是否国家重点实验室": "is_key_lab",
            "所在实验室": "laboratory", "项目角色": "role", "项目介绍": "description", "项目职责": "responsibilities",
            "主要职责": "responsibilities_summary", "职位": "role", "级别": "level", "工作职责": "responsibilities",
            "语种": "language", "语言证书": "certificate", "分数": "score", "技能/证书名称": "name", "详情": "details",
            "作品名称": "name", "链接/描述": "url_or_description", "名称": "name", "类别": "category",
            "获奖等级": "rank", "专利名称": "name", "专利号": "patent_number", "申请时间": "application_time",
            "所属刊物": "journal", "作者顺序": "author_order", "发表时间": "publish_time", "出生年月": "birth_date",
            "工作单位": "organization", "职务": "role", "职业": "job", "电话": "phone", "是否有在职亲属": "has_working_relatives",
            "是否有工作经历": "has_work_experience"
        }
        return mapping.get(chinese_name)

    def generate_markdown(self, data: dict) -> str:
        md = []
        md.append("# 简历模板\n")
        
        # 1. Basic Info
        basic = data.get("basic_info", {}) or {}
        md.append("## 基本信息\n")
        
        fields = [
            ("姓名", basic.get("name")), 
            ("性别", basic.get("gender") if basic.get("gender") is not None else ""), 
            ("出生日期", basic.get("birth_date") if basic.get("birth_date") is not None else ""),
            ("联系电话", basic.get("phone")), 
            ("电子邮箱", basic.get("email")),
            ("GitHub", basic.get("github")),
            ("LinkedIn", basic.get("linkedin")),
            ("个人主页", basic.get("homepage")),
            ("国籍（国家/地区）", basic.get("nationality")),
            ("籍贯", basic.get("native_place")), 
            ("居住地", basic.get("residence")), 
            ("政治面貌", basic.get("political_status")),
            ("最高学历", basic.get("highest_education")), 
            ("英语等级", basic.get("english_level")), 
            ("证件类型", basic.get("id_type")),
            ("证件号码", basic.get("id_number")), 
            ("意向面试地点", basic.get("interview_location")),
            ("招聘信息获取来源", basic.get("source")), 
            ("推荐码", basic.get("referral_code")), 
            ("紧急联系人（姓名+电话）", basic.get("emergency_contact"))
        ]
        
        primary_fields = ["姓名", "性别", "出生日期", "联系电话", "电子邮箱", "GitHub", "LinkedIn", "个人主页"]
        for cn, val in fields:
            val_str = val if val is not None else ""
            if val_str != "" or cn in primary_fields:
                if cn == "出生日期" and "-" in val_str:
                    parts = val_str.split('-')
                    if len(parts) == 3:
                        md.append(f"- **出生日期**：{parts[0]} 年 {int(parts[1])} 月 {int(parts[2])} 日")
                    else:
                        md.append(f"- **出生日期**：{val_str}")
                else:
                    md.append(f"- **{cn}**：{val_str}")
        md.append("")
        
        # 2. Career Objective
        objective = data.get("career_objective", {}) or {}
        md.append("## 求职意向\n")
        cities = "/".join(objective.get("preferred_cities", [])) if objective.get("preferred_cities") else ""
        md.append(f"- **期望城市**：{cities}")
        md.append(f"- **期望薪资**：{objective.get('expected_salary', '')}")
        md.append(f"- **到岗时间**：{objective.get('onboard_time', '')}\n")
        
        # 3. Education
        edu_list = data.get("education", []) or []
        md.append("## 教育经历\n")
        for edu in edu_list:
            md.append(f"- **{edu.get('degree', '学位')}**：\n")
            
            period_str = ""
            start = edu.get('period_start', '')
            if start:
                sy, sm = start.split('-')
                start_f = f"{sy}年{int(sm)}月"
                if edu.get('is_present'):
                    period_str = f"{start_f} – 至今"
                else:
                    end = edu.get('period_end', '')
                    if end:
                        ey, em = end.split('-')
                        period_str = f"{start_f} – {ey}年{int(em)}月"
            if not period_str:
                period_str = edu.get('period', '')

            md.append(f"  - **时间**：{period_str}")
            md.append(f"  - **所在院系/研究所**：{edu.get('institution', '')}")
            md.append(f"  - **受教育类型**：{edu.get('enrollment_type', '')}")
            courses = ", ".join(edu.get("courses", [])) if edu.get("courses") else ""
            md.append(f"  - **专业课程**：{courses}")
            md.append(f"  - **该学历是否为交流学习**：{'是' if edu.get('is_exchange') else '否'}")
            md.append(f"  - **该学历是否为联合办学**：{'是' if edu.get('is_joint') else '否'}")
            md.append(f"  - **专业类别**：{edu.get('major_category', '')}")
            md.append(f"  - **专业**：{edu.get('major', '')}")
            if edu.get('college'):
                md.append(f"  - **学院**：{edu.get('college', '')}")
            md.append(f"  - **成绩排名**：{edu.get('ranking', '')}")
            md.append(f"  - **GPA**：{edu.get('gpa', '')}")
            md.append(f"  - **学校所在地**：{edu.get('location', '')}")
            md.append(f"  - **导师姓名**：{edu.get('advisor', '')}")
            md.append(f"  - **是否国家重点实验室**：{'是' if edu.get('is_key_lab') else '否'}")
            md.append(f"  - **所在实验室**：{edu.get('laboratory', '')}\n")
            
        md.append(f"- **是否有在职亲属**：{'是' if data.get('has_working_relatives') else '否'}")
        md.append(f"- **是否有工作经历**：{'是' if data.get('has_work_experience') else '否'}\n")
        
        # 4. Tech Stack / Skills
        skill_list = data.get("skills_and_certificates", []) or []
        md.append("## 其他技能/证书\n")
        for sk in skill_list:
            md.append(f"- **技能/证书名称**：{sk.get('name', '')}\n")
            md.append(f"- **详情**：{sk.get('details', '')}\n")

        # 5. Papers
        if data.get("has_research_papers"):
            paper_list = data.get("papers", []) or []
            md.append("## 论文\n")
            for pap in paper_list:
                md.append(f"- **名称**：{pap.get('title', '')}\n")
                md.append(f"- **所属刊物**：{pap.get('journal', '')}\n")
                md.append(f"- **作者顺序**：{pap.get('author_order', '')}\n")
                md.append(f"- **发表时间**：{pap.get('publish_time', '')}\n")
                if pap.get("details"):
                    md.append(f"- **详情**：{pap.get('details', '')}\n")
        
        # 6. Projects
        if data.get("has_projects"):
            proj_list = data.get("projects", []) or []
            md.append("## 项目经历\n")
            for proj in proj_list:
                md.append(f"- **项目名称**：{proj.get('name', '')}\n")
                
                period_str = ""
                start = proj.get('period_start', '')
                if start:
                    sy, sm = start.split('-')
                    start_f = f"{sy}年{int(sm)}月"
                    if proj.get('is_present'):
                        period_str = f"{start_f} – 至今"
                    else:
                        end = proj.get('period_end', '')
                        if end:
                            ey, em = end.split('-')
                            period_str = f"{start_f} – {ey}年{int(em)}月"
                if not period_str:
                    period_str = proj.get('period', '')

                md.append(f"- **起止时间**：{period_str}\n")
                md.append(f"- **项目角色**：{proj.get('role', '')}\n")
                if proj.get('responsibilities_summary'):
                    md.append(f"- **主要职责**：{proj.get('responsibilities_summary', '')}\n")
                md.append(f"- **项目介绍**：{proj.get('description', '')}\n")
                md.append("- **项目职责**：")
                for resp in proj.get("responsibilities", []):
                    md.append(f"  - {resp}")
                md.append("")
            
        # 7. Awards (Grouped by Academic Year)
        if data.get("has_awards"):
            award_list = data.get("awards", []) or []
            md.append("## 竞赛/获奖经历\n")
            
            groups = {}
            for aw in award_list:
                if not aw.get('name') or not aw.get('date'):
                    continue
                date_val = aw.get('date', '')
                period_val = ""
                if date_val and "-" in date_val:
                    try:
                        parts = date_val.split('-')
                        year = int(parts[0])
                        month = int(parts[1])
                        if month <= 9:
                            period_val = f"{year-1}年09月 – {year}年09月"
                        else:
                            period_val = f"{year}年09月 – {year+1}年09月"
                    except:
                        pass
                if not period_val:
                    period_val = aw.get('period', '')
                
                if period_val:
                    if period_val not in groups:
                        groups[period_val] = []
                    name_str = aw.get('name', '')
                    if aw.get('level'):
                        name_str += f" ({aw.get('level')})"
                    groups[period_val].append(name_str)
            
            sorted_years = sorted(groups.keys(), reverse=True)
            for y in sorted_years:
                md.append(f"- **{y}**：{'，'.join(groups[y])}")
            md.append("")
            
        # 8. Student Leadership
        if data.get("has_student_leadership"):
            leader_list = data.get("student_leadership", []) or []
            md.append("## 学生干部经历\n")
            for leader in leader_list:
                md.append(f"- **职位**：{leader.get('role', '')}\n")
                md.append(f"- **级别**：{leader.get('level', '')}\n")
                
                period_str = ""
                start = leader.get('period_start', '')
                if start:
                    sy, sm = start.split('-')
                    start_f = f"{sy}年{int(sm)}月"
                    if leader.get('is_present'):
                        period_str = f"{start_f} – 至今"
                    else:
                        end = leader.get('period_end', '')
                        if end:
                            ey, em = end.split('-')
                            period_str = f"{start_f} – {ey}年{int(em)}月"
                if not period_str:
                    period_str = leader.get('period', '')

                md.append(f"- **时间**：{period_str}\n")
                md.append("- **工作职责**：")
                for resp in leader.get("responsibilities", []):
                    md.append(f"  - {resp}")
                md.append("")
            md.append(f"- **有无校内活动经历**：{'是' if data.get('has_campus_activities') else '否'}\n")
        
        # 9. Languages
        if data.get("has_languages"):
            lang_list = data.get("languages", []) or []
            md.append("## 语言能力\n")
            for lang in lang_list:
                md.append(f"- **语种**：{lang.get('language', '')}")
                md.append(f"- **语言证书**：{lang.get('certificate', '')}")
                md.append(f"- **分数**：{lang.get('score', '')}\n")
            
        # 10. Portfolio
        if data.get("has_portfolio"):
            port_list = data.get("portfolio", []) or []
            md.append("## 作品\n")
            for p in port_list:
                md.append(f"- **作品名称**：{p.get('name', '')}\n")
                md.append(f"- **链接/描述**：{p.get('url_or_description', '')}\n")

        # 11. Patents
        if data.get("has_patents"):
            patent_list = data.get("patents", []) or []
            md.append("## 发明专利\n")
            for pat in patent_list:
                md.append(f"- **专利名称**：{pat.get('name', '')}\n")
                md.append(f"- **专利号**：{pat.get('patent_number', '')}\n")
                md.append(f"- **申请时间**：{pat.get('application_time', '')}\n")
            
        # 12. Family
        if data.get("has_family"):
            family = data.get("family_members", []) or []
            md.append("## 家庭成员\n")
            for fam in family:
                if fam.get("role"):
                    md.append(f"- {fam.get('role')}：{fam.get('name', '')}，工作单位：{fam.get('organization', '')}，职业：{fam.get('job', '')}\n")
            
        # 13. Self Evaluation
        if data.get("has_self_evaluation"):
            eval_text = data.get("self_evaluation", "")
            md.append("## 自我评价\n")
            md.append(eval_text)
            md.append("")
        
        return "\n".join(md)

    def generate_latex(self, data: dict) -> str:
        basic = data.get("basic_info", {}) or {}
        edu_list = data.get("education", []) or []
        skill_list = data.get("skills_and_certificates", []) or []
        proj_list = data.get("projects", []) or []
        
        def esc(s):
            if not s:
                return ""
            return s.replace('\\', '\\\\').replace('&', '\\&').replace('%', '\\%').replace('$', '\\$').replace('#', '\\#').replace('_', '\\_').replace('{', '\\{').replace('}', '\\}').replace('~', '\\textasciitilde').replace('^', '\\textasciicircum')

        def get_github_tex(val):
            if not val:
                return ""
            url = val
            username = val
            if not val.startswith("http"):
                url = f"https://github.com/{val}"
            else:
                match = re.search(r"github\.com/([^/]+)", val)
                if match:
                    username = match.group(1)
            return f"\\faGithub{{\\href{{{url}}}{{{username}}}}}"

        def get_linkedin_tex(val):
            if not val:
                return ""
            url = val
            username = val
            if not val.startswith("http"):
                url = f"https://linkedin.com/in/{val}"
            else:
                match = re.search(r"linkedin\.com/in/([^/]+)", val)
                if match:
                    username = match.group(1)
            return f"\\faLinkedin{{\\href{{{url}}}{{{username}}}}}"

        def get_homepage_tex(val):
            if not val:
                return ""
            url = val
            display = val.replace("https://", "").replace("http://", "")
            if not val.startswith("http"):
                url = f"https://{val}"
            return f"\\faLink{{\\href{{{url}}}{{{display}}}}}"

        def format_tex_date(date_str):
            if not date_str:
                return ""
            parts = date_str.split('-')
            if len(parts) == 2:
                return f"{parts[0]}年{int(parts[1])}月"
            return date_str

        def get_period_string_tex(item):
            start = format_tex_date(item.get('period_start', ''))
            end = "至今" if item.get('is_present') else format_tex_date(item.get('period_end', ''))
            if not start and not end:
                raw_period = item.get('period', '')
                if raw_period:
                    return re.sub(r'\s*[–—-]+\s*', ' -- ', raw_period)
                return ""
            return f"{start} -- {end}"

        def clean_academic_year_tex(year_range):
            if not year_range:
                return ""
            yr = re.sub(r'\s+', '', year_range)
            yr = re.sub(r'[–—-]+', '--', yr)
            yr = re.sub(r'0(\d)月', r'\1月', yr)
            return yr

        tex = []
        tex.append("% !TEX TS-program = xelatex")
        tex.append("% !TEX encoding = UTF-8 Unicode")
        tex.append("")
        tex.append("\\documentclass{resume}")
        tex.append("\\usepackage{zh_CN-Adobefonts_external}")
        tex.append("\\usepackage{linespacing_fix}")
        tex.append("\\usepackage{cite}")
        tex.append("\\usepackage{geometry}")
        # Tight layout margins with footskip room for page number
        tex.append("\\geometry{a4paper,left=1.2cm,right=1.2cm,top=1.2cm,bottom=1.2cm,footskip=0.6cm}")
        tex.append("")
        tex.append("% Set exact font styles")
        tex.append("\\setmainfont{Times New Roman}")
        tex.append("")
        tex.append("% Page numbering configuration")
        tex.append("\\usepackage{fancyhdr}")
        tex.append("\\pagestyle{fancy}")
        tex.append("\\fancyhf{}")
        tex.append("\\renewcommand{\\headrulewidth}{0pt}")
        tex.append("\\cfoot{\\small 第~\\thepage~页}")
        tex.append("")
        tex.append("% Compact layout spacing overrides")
        tex.append("\\titlespacing*{\\section}{0cm}{1.2ex}{1.0ex}")
        tex.append("\\titlespacing*{\\subsection}{0cm}{1.0ex}{0.5ex}")
        tex.append("\\setlist[itemize]{nosep, leftmargin=1.5pc}")
        tex.append("")
        tex.append("\\begin{document}")
        tex.append("\\pagenumbering{arabic}")
        tex.append("")
        
        # Name
        tex.append(f"\\name{{{esc(basic.get('name'))}}}")
        
        # Basic Info list
        basic_parts = []
        if basic.get("email"):
            basic_parts.append(f"\\email{{{esc(basic.get('email'))}}}")
        if basic.get("phone"):
            basic_parts.append(f"\\phone{{{esc(basic.get('phone'))}}}")
        if basic.get("show_birth_date", True) and basic.get("birth_date"):
            parts = basic.get("birth_date").split('-')
            formatted_birth = f"{parts[0]}年{int(parts[1])}月{int(parts[2])}日" if len(parts) == 3 else basic.get("birth_date")
            basic_parts.append(f"\\faCalendar{{{esc(formatted_birth)}}}")
        elif basic.get("birth_date"):
            parts = basic.get("birth_date").split('-')
            formatted_birth = f"{parts[0]}年{int(parts[1])}月{int(parts[2])}日" if len(parts) == 3 else basic.get("birth_date")
            basic_parts.append(f"\\faCalendar{{{esc(formatted_birth)}}}")
            
        if basic.get("gender"):
            basic_parts.append(f"\\faGroup {{{esc(basic.get('gender'))}}}")
        
        # New explicit LaTeX bindings for github, linkedin, homepage
        if basic.get("github"):
            tex_github = get_github_tex(basic.get("github"))
            if tex_github:
                basic_parts.append(tex_github)
        if basic.get("linkedin"):
            tex_linkedin = get_linkedin_tex(basic.get("linkedin"))
            if tex_linkedin:
                basic_parts.append(tex_linkedin)
        if basic.get("homepage"):
            tex_homepage = get_homepage_tex(basic.get("homepage"))
            if tex_homepage:
                basic_parts.append(tex_homepage)

        tex.append("\\basicInfo{")
        tex.append(f"\t{' \\textperiodcentered\\ \n\t'.join(basic_parts)}")
        tex.append("}")
        tex.append("")
        
        # Education Background
        if edu_list:
            tex.append("%% 教育背景")
            tex.append("\\section{教育背景}")
            tex.append("")
            for edu in edu_list:
                tex.append(f"\\datedsubsection{{\\textbf{{{esc(edu.get('institution'))}}} \\ {esc(edu.get('major'))} \\ {esc(edu.get('degree'))}}}{{{get_period_string_tex(edu)}}}")
                course_str = "、".join(edu.get("courses", [])) if edu.get("courses") else ""
                detail_parts = []
                if edu.get("gpa"):
                    detail_parts.append(f"\\textit{{GPA：}}\\ {esc(edu.get('gpa'))}")
                if edu.get("ranking"):
                    detail_parts.append(f"\\textit{{排名：}}\\ {esc(edu.get('ranking'))}")
                if course_str:
                    detail_parts.append(f"\\textit{{相关课程：}}\\ {esc(course_str)}")
                
                if detail_parts:
                    tex.append("\\begin{itemize}")
                    tex.append(f"    \\item {'\\ '.join(detail_parts)}")
                    tex.append("\\end{itemize}")
                tex.append("")
                
        # Skills and Interests
        if skill_list:
            tex.append("% =============================================================================")
            tex.append("% 技能与兴趣")
            tex.append("% =============================================================================")
            tex.append("\\section{\\textbf{技能与兴趣}}")
            tex.append("\\begin{onehalfspacing}")
            tex.append("\\begin{itemize}")
            for sk in skill_list:
                sk_name = sk.get("name", "").strip().rstrip(":").rstrip("：")
                tex.append(f"    \\item \\textbf{{{esc(sk_name)}：}} {esc(sk.get('details'))}")
            tex.append("\\end{itemize}")
            tex.append("\\end{onehalfspacing}")
            tex.append("")
            
        # Project Experience
        if proj_list:
            tex.append("%% 科研经历")
            tex.append("\\section{项目经历}")
            tex.append("")
            for proj in proj_list:
                tex.append(f"\\datedsubsection{{\\textbf{{{esc(proj.get('name'))}}} \\ {esc(proj.get('role'))}}}{{{get_period_string_tex(proj)}}}")
                tex.append("\\begin{onehalfspacing}")
                tex.append(f"    \\textbf{{项目简介：}} {esc(proj.get('description'))}\\\\")
                tex.append(f"    \\textbf{{主要职责：}} {esc(proj.get('responsibilities_summary', '负责该项目的核心开发与系统验证。'))}\\\\")
                tex.append("    \\textbf{亮点：}")
                if proj.get("responsibilities"):
                    tex.append("    \\begin{itemize}")
                    for resp in proj.get("responsibilities"):
                        colon_match = re.search(r"^(.*?[：:])\s*(.*)$", resp)
                        if colon_match:
                            prefix = colon_match.group(1).strip().rstrip(":").rstrip("：") + "："
                            tex.append(f"        \\item \\textbf{{{esc(prefix)}}} {esc(colon_match.group(2))}")
                        else:
                            tex.append(f"        \\item {esc(resp)}")
                    tex.append("    \\end{itemize}")
                tex.append("\\end{onehalfspacing}")
                tex.append("")
                
        # Awards Grouped by Academic Year
        if data.get("has_awards") and data.get("awards"):
            tex.append("%% 所获荣誉")
            tex.append("\\section{所获荣誉}")
            groups = {}
            for aw in data.get("awards", []):
                if not aw.get("name") or not aw.get("date"):
                    continue
                d = aw.get("date")
                parts = d.split('-')
                year = int(parts[0])
                month = int(parts[1])
                yr_range = f"{year-1}年09月 – {year}年09月" if month <= 9 else f"{year}年09月 – {year+1}年09月"
                tex_yr = clean_academic_year_tex(yr_range)
                if tex_yr not in groups:
                    groups[tex_yr] = []
                name_str = aw.get("name")
                if aw.get("level"):
                    name_str += f" ({aw.get('level')})"
                groups[tex_yr].append(name_str)
                
            sorted_yrs = sorted(groups.keys(), reverse=True)
            for yr in sorted_yrs:
                tex.append(f"\\datedsubsection{{\\textbf{{{yr}}}}}{{\\ {'，'.join(groups[yr])}}}")
            tex.append("")
            
        tex.append("\\end{document}")
        return "\n".join(tex)

    def validate_data(self, data: dict) -> list:
        import os
        errors = []
        schema_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "schema.json")
        if not os.path.exists(schema_path):
            return ["Warning: schema.json not found, skipping validation."]
            
        try:
            with open(schema_path, "r", encoding="utf-8") as f:
                schema = json.load(f)
        except Exception as e:
            return [f"Warning: Failed to load schema.json: {e}"]

        properties = schema.get("properties", {})
        for key, value in data.items():
            if value is None:
                continue
                
            if key not in properties:
                errors.append(f"Field '{key}' is not defined in the JSON schema.")
                continue
                
            schema_type = properties[key].get("type")
            if schema_type == "object":
                if not isinstance(value, dict):
                    errors.append(f"Field '{key}' must be an object/dict (got {type(value).__name__}).")
                else:
                    sub_props = properties[key].get("properties", {})
                    for sub_key, sub_val in value.items():
                        if sub_val is None:
                            continue
                        if sub_key not in sub_props:
                            errors.append(f"Sub-field '{key}.{sub_key}' is not defined in the schema.")
                        else:
                            sub_type = sub_props[sub_key].get("type")
                            if sub_type == "string" and not isinstance(sub_val, str):
                                errors.append(f"Sub-field '{key}.{sub_key}' must be a string (got {type(sub_val).__name__}).")
                            elif sub_type == "boolean" and not isinstance(sub_val, bool):
                                errors.append(f"Sub-field '{key}.{sub_key}' must be a boolean (got {type(sub_val).__name__}).")
                            elif sub_type == "array" and not isinstance(sub_val, list):
                                errors.append(f"Sub-field '{key}.{sub_key}' must be an array/list (got {type(sub_val).__name__}).")
            elif schema_type == "array":
                if not isinstance(value, list):
                    errors.append(f"Field '{key}' must be an array/list (got {type(value).__name__}).")
                else:
                    item_def = properties[key].get("items", {})
                    item_type = item_def.get("type")
                    for idx, item in enumerate(value):
                        if item_type == "object":
                            if not isinstance(item, dict):
                                errors.append(f"Item {idx} in '{key}' must be an object/dict (got {type(item).__name__}).")
                            else:
                                item_props = item_def.get("properties", {})
                                for item_key, item_val in item.items():
                                    if item_val is None:
                                        continue
                                    if item_key not in item_props:
                                        errors.append(f"Field '{key}[{idx}].{item_key}' is not defined in the schema.")
                                    else:
                                        i_type = item_props[item_key].get("type")
                                        if i_type == "string" and not isinstance(item_val, str):
                                            errors.append(f"Field '{key}[{idx}].{item_key}' must be a string (got {type(item_val).__name__}).")
                                        elif i_type == "boolean" and not isinstance(item_val, bool):
                                            errors.append(f"Field '{key}[{idx}].{item_key}' must be a boolean (got {type(item_val).__name__}).")
                                        elif i_type == "array" and not isinstance(item_val, list):
                                            errors.append(f"Field '{key}[{idx}].{item_key}' must be an array/list (got {type(item_val).__name__}).")
                        elif item_type == "string" and not isinstance(item, str):
                            errors.append(f"Item {idx} in '{key}' must be a string (got {type(item).__name__}).")
            elif schema_type == "boolean" and not isinstance(value, bool):
                errors.append(f"Field '{key}' must be a boolean (got {type(value).__name__}).")
            elif schema_type == "string" and not isinstance(value, str):
                errors.append(f"Field '{key}' must be a string (got {type(value).__name__}).")
                
        return errors

def main():
    parser = argparse.ArgumentParser(description="Bidirectional CV parser and generator")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # parse subcommand
    parse_parser = subparsers.add_parser("parse", help="Parse Markdown to JSON")
    parse_parser.add_argument("-i", "--input", required=True, help="Input Markdown file path")
    parse_parser.add_argument("-o", "--output", required=True, help="Output JSON file path")
    
    # generate subcommand
    gen_parser = subparsers.add_parser("generate", help="Generate Markdown from JSON")
    gen_parser.add_argument("-i", "--input", required=True, help="Input JSON file path")
    gen_parser.add_argument("-o", "--output", required=True, help="Output Markdown file path")
    
    # latex subcommand
    latex_parser = subparsers.add_parser("latex", help="Generate LaTeX source from JSON")
    latex_parser.add_argument("-i", "--input", required=True, help="Input JSON file path")
    latex_parser.add_argument("-o", "--output", required=True, help="Output LaTeX file path")
    
    args = parser.parse_args()
    
    cv_parser = CVParser()
    
    if args.command == "parse":
        try:
            with open(args.input, "r", encoding="utf-8") as f:
                content = f.read()
            data = cv_parser.parse_markdown(content)
            
            # Perform schema validation
            val_errors = cv_parser.validate_data(data)
            if val_errors:
                print("⚠️ Schema validation warning details during Markdown parsing:", file=sys.stderr)
                for err in val_errors:
                    print(f"  - {err}", file=sys.stderr)
                    
            with open(args.output, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
            print(f"Success: Parsed {args.input} into {args.output}")
        except Exception as e:
            print(f"Error parsing markdown: {e}", file=sys.stderr)
            sys.exit(1)
            
    elif args.command == "generate":
        try:
            with open(args.input, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            # Perform schema validation
            val_errors = cv_parser.validate_data(data)
            if val_errors:
                print("⚠️ Schema validation warnings in source JSON:", file=sys.stderr)
                for err in val_errors:
                    print(f"  - {err}", file=sys.stderr)
                    
            md_content = cv_parser.generate_markdown(data)
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(md_content)
            print(f"Success: Generated {args.output} from {args.input}")
        except Exception as e:
            print(f"Error generating markdown: {e}", file=sys.stderr)
            sys.exit(1)

    elif args.command == "latex":
        try:
            with open(args.input, "r", encoding="utf-8") as f:
                data = json.load(f)
                
            # Perform schema validation
            val_errors = cv_parser.validate_data(data)
            if val_errors:
                print("⚠️ Schema validation warnings in source JSON:", file=sys.stderr)
                for err in val_errors:
                    print(f"  - {err}", file=sys.stderr)
                    
            latex_content = cv_parser.generate_latex(data)
            with open(args.output, "w", encoding="utf-8") as f:
                f.write(latex_content)
            print(f"Success: Generated {args.output} from {args.input}")
        except Exception as e:
            print(f"Error generating latex: {e}", file=sys.stderr)
            sys.exit(1)

if __name__ == "__main__":
    main()
