import React, { useState, useEffect } from 'react';

// Pre-populate with Voldemort (playful / humorous) fake template data
const initialResumeData = {
  basic_info: {
    name: "伏地魔 (Voldemort)",
    gender: "男",
    birth_date: "1926-12-31",
    show_birth_date: true,
    phone: "+86 138-6666-8888",
    email: "voldemort@hogwarts.edu",
    github: "https://github.com/voldemort-darklord",
    linkedin: "https://linkedin.com/in/tom-riddle",
    homepage: "https://riddle.org",
    nationality: "巫师",
    native_place: "伦敦伍氏孤儿院",
    residence: "冈特老宅 (Gaunt House)",
    political_status: "食死徒领袖",
    highest_education: "黑魔法高级进修",
    english_level: "蛇腔 (10级 / 蛇类无障碍沟通)",
    id_type: "英国魔法部-巫师身份证",
    id_number: "666888192612310007",
    interview_location: "霍格沃茨城堡",
    source: "密室自主创业",
    referral_code: "DARKMARK666",
    emergency_contact: "纳吉尼 (Nagini) +86 139-8888-9999"
  },
  career_objective: {
    preferred_cities: ["伦敦", "阿兹卡班", "霍格莫德"],
    expected_salary: "面议 (魔法界统治权)",
    onboard_time: "随时召集食死徒到岗"
  },
  education: [
    {
      degree: "硕士学位",
      period_start: "1943-09",
      period_end: "1945-06",
      is_present: false,
      institution: "霍格沃茨魔法学校",
      enrollment_type: "全日制",
      courses: ["摄神取念术", "魂器制作原理", "黑魔法防御术", "母猪饲料营养学与产后护理"],
      is_exchange: false,
      is_joint: false,
      major_category: "黑魔法工程学",
      college: "斯莱特林学院 (蛇院)",
      major: "母猪的产后护理与阿瓦达索命术",
      ranking: "前1%",
      gpa: "O (优秀 / Outstanding)",
      location: "英国苏格兰",
      advisor: "Salazar Slytherin (精神导师)",
      is_key_lab: true,
      laboratory: "霍格沃茨密室联合实验室 (Chamber of Secrets)"
    },
    {
      degree: "学士学位",
      period_start: "1938-09",
      period_end: "1943-06",
      is_present: false,
      institution: "霍格沃茨魔法学校",
      enrollment_type: "全日制",
      courses: ["魔药学", "变形课", "草药学", "黑魔法历史"],
      is_exchange: false,
      is_joint: false,
      major_category: "魔法学",
      college: "斯莱特林学院 (蛇院)",
      major: "蛇腔大佬入门与实践",
      ranking: "前1%",
      gpa: "O (优秀)",
      location: "英国苏格兰",
      advisor: "Albus Dumbledore (变形课教授)",
      is_key_lab: false,
      laboratory: "无"
    }
  ],
  has_working_relatives: false,
  has_work_experience: true,
  has_research_papers: true,
  has_projects: true,
  has_student_leadership: true,
  has_awards: true,
  has_languages: true,
  has_patents: false,
  has_portfolio: true,
  has_family: false,
  has_self_evaluation: true,
  
  projects: [
    {
      name: "基于多模态传感器融合与轻量化时序网络的智能机械故障预测系统",
      period_start: "2025-06",
      period_end: "2026-08",
      is_present: false,
      role: "毕业设计 (独立研究员)",
      responsibilities_summary: "主导多模态数据采集与轻量化时序网络模型设计，实现边缘网关故障分析开发。",
      description: "针对工业物联网中旋转机械的状态监测需求，设计并开发了一套基于深度学习的多通道振动与温度信号融合诊断系统，实现轴承早期微弱故障的精准预测与健康评估。",
      responsibilities: [
        "数据采集与去噪：负责多通道加速度与温度信号同步采集、小波包去噪及特征标准化。",
        "网络模型设计：设计结合时间卷积网络 (TCN) 与自注意力机制的轻量化多源时序信号融合模型。",
        "模型量化与部署：在 PyTorch 框架下完成网络训练，应用剪枝与 8-bit 量化技术部署于边缘网关。",
        "分类准确度：在公开及实测数据集上实现了 10 种典型机械状态分类，平均准确率达 94.2%。"
      ]
    },
    {
      name: "基于 RT-Thread 与多节点低功耗无线网络的智能微气候监测系统",
      period_start: "2025-03",
      period_end: "2026-06",
      is_present: false,
      role: "系统架构师与底层开发",
      responsibilities_summary: "负责多路传感器驱动编写、Sub-1G/LoRa 自组网协议设计及网关系统移植开发。",
      description: "研发面向智慧农业微气候环境的高精度、低功耗分布式监测网络，实现多节点空气温湿度、光照、土壤湿度等数据的自组网采集与云端联动。",
      responsibilities: [
        "超低功耗硬件：基于低功耗 SoC 芯片自主设计多层 PCB，优化电源管理，使休眠电流降至微安级。",
        "RTOS 驱动开发：移植 RT-Thread 实时操作系统，编写多通道 ADC、I2C 传感器及电源管理底层驱动。",
        "自组网协议设计：编写基于 Sub-1G/LoRa 的无线协议，设计抗干扰时分多址 (TDMA) 数据上传机制。",
        "云端系统集成：搭建 MQTT 网关，对接云端物联网平台，设计基于微信小程序的可视化系统。"
      ]
    }
  ],
  student_leadership: [
    {
      role: "男学生会主席 (Head Boy)",
      level: "学校级",
      period_start: "1942-09",
      period_end: "1943-06",
      is_present: false,
      responsibilities: [
        "日常巡查管理：负责霍格沃茨级长与日常走廊巡查，维护学校秩序。",
        "密室秘密联络：暗中联络蛇怪并启动密室清除计划，进行斯莱特林血统净化测试。"
      ]
    }
  ],
  languages: [
    {
      language: "蛇腔 (Parseltongue)",
      certificate: "密室血统认证",
      score: "极度流利"
    }
  ],
  skills_and_certificates: [
    {
      name: "黑巫术与诅咒开发",
      details: "熟练掌握阿瓦达索命咒、钻心剜骨咒和夺魂咒等不可饶恕咒；掌握高阶灵魂分割与魂器（Horcrux）开发移植部署能力。"
    },
    {
      name: "团队建设与组织管理",
      details: "创办并管理食死徒（Death Eaters）核心开发团队，设计食死徒统一皮肤（黑魔标记印记），具备强大的洗脑式企业文化建设与动员能力。"
    },
    {
      name: "蛇腔语言无障碍开发",
      details: "支持跨物种语言通信，实现对蛇怪等冷血动物的直接底层驱动与逻辑控制。"
    }
  ],
  portfolio: [
    {
      name: "GitHub 黑魔标记发布页",
      url_or_description: "https://github.com/voldemort-darklord"
    }
  ],
  awards: [
    {
      name: "阿瓦达索命速发大赛一等奖",
      category: "学术技能",
      date: "1943-05",
      level: "国际级",
      rank: "一等奖"
    },
    {
      name: "最具影响力黑巫师提名奖",
      category: "综合素质",
      date: "1944-09",
      level: "国际级",
      rank: "提名奖"
    }
  ],
  patents: [],
  papers: [
    {
      title: "魂器裂分技术与灵魂七等份可行性分析报告",
      journal: "预言家日报学术版 (Daily Prophet Academic)",
      author_order: "独立作者",
      publish_time: "1943年06月",
      details: "斯莱特林密室内部期刊收录"
    }
  ],
  family_members: [],
  self_evaluation: "精通摄神取念术与各种禁忌黑魔法，致力于突破死亡边界并重建魔法界新秩序。具备优秀的蛇腔沟通能力，擅长团队搭建（食死徒体系建设）与魂器生命保障系统的设计开发。"
};

export default function App() {
  const [resume, setResume] = useState(initialResumeData);
  const [activeTab, setActiveTab] = useState('preview'); // preview, markdown, json, latex
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Real-time styling customizer state
  const [previewTheme, setPreviewTheme] = useState('classic'); // classic, warm, academic, midnight
  const [previewFontSize, setPreviewFontSize] = useState('13px'); // 12px, 13px, 14px
  const [previewSectionStyle, setPreviewSectionStyle] = useState('underline'); // underline, border-left, minimalist
  const [previewMargin, setPreviewMargin] = useState('standard'); // tight, standard, loose

  // Schema real-time validation state
  const [schemaDiagnostics, setSchemaDiagnostics] = useState([]);
  const [showDiagnosticsLog, setShowDiagnosticsLog] = useState(false);

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    objective: true,
    education: true,
    skills: true,
    papers: true,
    projects: true,
    awards: true,
    leadership: false,
    languages: false,
    portfolio: false,
    patents: false,
    family: false,
    self: true
  });
  
  // AI Assist simplified state
  const [aiActiveField, setAiActiveField] = useState(null);
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');

  // Run real-time schema validation when resume data changes
  useEffect(() => {
    validateAgainstSchemaRules();
  }, [resume]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Format Helper: format YYYY-MM to Chinese date string
  const formatPeriodDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    return `${year}年${parseInt(month, 10)}月`;
  };

  const getPeriodString = (item) => {
    const start = formatPeriodDate(item.period_start);
    if (item.is_present) {
      return `${start} – 至今`;
    }
    const end = formatPeriodDate(item.period_end);
    return `${start} – ${end}`;
  };

  const getAwardAcademicYear = (dateStr) => {
    if (!dateStr) return '';
    const [yearStr, monthStr] = dateStr.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    if (month <= 9) {
      return `${year - 1}年09月 – {year}年09月`.replace('{year}', year.toString());
    } else {
      return `${year}年09月 – {year+1}年09月`.replace('{year+1}', (year + 1).toString());
    }
  };

  const cleanAcademicYearTex = (yearRange) => {
    if (!yearRange) return '';
    return yearRange
      .replace(/\s+/g, '') // remove spaces
      .replace(/[–—-]+/g, '--') // normalize dashes to LaTeX style --
      .replace(/0(\d)月/g, '$1月'); // remove leading zero from month
  };

  // Real-time Schema verification helper (Zero dependencies)
  const validateAgainstSchemaRules = () => {
    const diag = [];
    const basic = resume.basic_info || {};

    // Validate email format
    if (basic.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basic.email)) {
      diag.push({ severity: 'warning', msg: `电子邮箱格式不合规: ${basic.email}` });
    }
    // Validate phone number structure
    if (basic.phone && !/^\+?\d[\d-\s]{8,15}\d$/.test(basic.phone)) {
      diag.push({ severity: 'info', msg: `联系电话非标准电话格式: ${basic.phone}` });
    }

    // Validate array structures
    if (resume.education && resume.education.length > 0) {
      resume.education.forEach((edu, idx) => {
        if (!edu.institution) diag.push({ severity: 'warning', msg: `教育经历 #${idx + 1} 缺失学校名称` });
        if (!edu.major) diag.push({ severity: 'warning', msg: `教育经历 #${idx + 1} 缺失所学专业` });
        if (edu.period_start && edu.period_end && edu.period_start > edu.period_end) {
          diag.push({ severity: 'error', msg: `教育经历 #${idx + 1} 起止日期逻辑颠倒` });
        }
      });
    }

    if (resume.has_projects && resume.projects && resume.projects.length > 0) {
      resume.projects.forEach((proj, idx) => {
        if (!proj.name) diag.push({ severity: 'warning', msg: `项目经历 #${idx + 1} 缺失项目名称` });
        if (!proj.role) diag.push({ severity: 'warning', msg: `项目经历 #${idx + 1} 缺失担任角色` });
      });
    }

    if (resume.has_awards && resume.awards && resume.awards.length > 0) {
      resume.awards.forEach((aw, idx) => {
        if (!aw.name) diag.push({ severity: 'warning', msg: `获奖经历 #${idx + 1} 缺失荣誉名称` });
        if (!aw.date) diag.push({ severity: 'warning', msg: `获奖经历 #${idx + 1} 未选择获奖日期` });
      });
    }

    setSchemaDiagnostics(diag);
  };

  const handleBasicChange = (field, val) => {
    setResume(prev => ({
      ...prev,
      basic_info: { ...prev.basic_info, [field]: val }
    }));
    if (errors[`basic_info.${field}`]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[`basic_info.${field}`];
        return next;
      });
    }
  };

  const handleObjectiveChange = (field, val) => {
    setResume(prev => {
      if (field === 'preferred_cities') {
        return {
          ...prev,
          career_objective: { ...prev.career_objective, preferred_cities: val.split(/[,，/]/).map(c => c.trim()) }
        };
      }
      return {
        ...prev,
        career_objective: { ...prev.career_objective, [field]: val }
      };
    });
  };

  const handleArrayItemChange = (section, index, field, val) => {
    setResume(prev => {
      const arr = [...prev[section]];
      if (field === 'courses') {
        arr[index] = { ...arr[index], courses: val.split(/[,，]/).map(c => c.trim()) };
      } else {
        arr[index] = { ...arr[index], [field]: val };
      }
      return { ...prev, [section]: arr };
    });

    const errKey = `${section}.${index}.${field}`;
    if (errors[errKey]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[errKey];
        return next;
      });
    }
  };

  const addArrayItem = (section, template) => {
    setResume(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleResponsibilityChange = (section, itemIndex, respIndex, val) => {
    setResume(prev => {
      const arr = [...prev[section]];
      const resps = [...(arr[itemIndex].responsibilities || [])];
      resps[respIndex] = val;
      arr[itemIndex] = { ...arr[itemIndex], responsibilities: resps };
      return { ...prev, [section]: arr };
    });
  };

  const addResponsibility = (section, itemIndex) => {
    setResume(prev => {
      const arr = [...prev[section]];
      const resps = [...(arr[itemIndex].responsibilities || []), ""];
      arr[itemIndex] = { ...arr[itemIndex], responsibilities: resps };
      return { ...prev, [section]: arr };
    });
  };

  const removeResponsibility = (section, itemIndex, respIndex) => {
    setResume(prev => {
      const arr = [...prev[section]];
      const resps = (arr[itemIndex].responsibilities || []).filter((_, i) => i !== respIndex);
      arr[itemIndex] = { ...arr[itemIndex], responsibilities: resps };
      return { ...prev, [section]: arr };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^1[3-9]\d{9}$|^\+86\s*1[3-9]\d{9}$/;

    const basic = resume.basic_info;
    if (!basic.name) newErrors['basic_info.name'] = '姓名是必填项';
    
    if (basic.phone && !phoneRegex.test(basic.phone.replace(/[-\s]/g, ''))) {
      newErrors['basic_info.phone'] = '请输入有效的11位中国手机号';
    }

    if (basic.email && !emailRegex.test(basic.email)) {
      newErrors['basic_info.email'] = '请输入有效的邮箱地址';
    }

    if (resume.education && resume.education.length > 0) {
      resume.education.forEach((edu, idx) => {
        if (!edu.institution) newErrors[`education.${idx}.institution`] = '学校名称是必填项';
        if (!edu.major) newErrors[`education.${idx}.major`] = '所学专业是必填项';
        if (!edu.degree) newErrors[`education.${idx}.degree`] = '学位是必填项';
        if (!edu.period_start) newErrors[`education.${idx}.period_start`] = '开始时间是必填项';
        if (!edu.is_present && !edu.period_end) newErrors[`education.${idx}.period_end`] = '结束时间是必填项';
      });
    }

    if (resume.has_projects && resume.projects && resume.projects.length > 0) {
      resume.projects.forEach((proj, idx) => {
        if (!proj.name) newErrors[`projects.${idx}.name`] = '项目名称是必填项';
        if (!proj.role) newErrors[`projects.${idx}.role`] = '项目角色是必填项';
        if (!proj.period_start) newErrors[`projects.${idx}.period_start`] = '开始时间是必填项';
        if (!proj.is_present && !proj.period_end) newErrors[`projects.${idx}.period_end`] = '结束时间是必填项';
      });
    }

    if (resume.has_awards && resume.awards && resume.awards.length > 0) {
      resume.awards.forEach((aw, idx) => {
        if (!aw.name) newErrors[`awards.${idx}.name`] = '荣誉名称是必填项';
        if (!aw.date) newErrors[`awards.${idx}.date`] = '获奖时间是必填项';
      });
    }

    setErrors(newErrors);
    setIsSubmitted(true);
    return Object.keys(newErrors).length === 0;
  };

  const generateMarkdown = (data) => {
    let md = [];
    md.push("# 简历模板\n");
    
    const basic = data.basic_info || {};
    md.push("## 基本信息\n");
    
    const birthVal = (basic.show_birth_date !== false) ? (basic.birth_date || "") : "";
    const genderVal = basic.gender || "";

    const basicFields = [
      ["姓名", basic.name], ["性别", genderVal], ["出生日期", birthVal],
      ["联系电话", basic.phone], ["电子邮箱", basic.email],
      ["GitHub", basic.github], ["LinkedIn", basic.linkedin], ["个人主页", basic.homepage],
      ["国籍（国家/地区）", basic.nationality],
      ["籍贯", basic.native_place], ["居住地", basic.residence], ["政治面貌", basic.political_status],
      ["最高学历", basic.highest_education], ["英语等级", basic.english_level], ["证件类型", basic.id_type],
      ["证件号码", basic.id_number], ["意向面试地点", basic.interview_location],
      ["招聘信息获取来源", basic.source], ["推荐码", basic.referral_code], ["紧急联系人（姓名+电话）", basic.emergency_contact]
    ];
    basicFields.forEach(([cn, val]) => {
      const val_str = val || "";
      const isPrimary = ["姓名", "性别", "出生日期", "联系电话", "电子邮箱", "GitHub", "LinkedIn", "个人主页"].includes(cn);
      if (val_str !== "" || isPrimary) {
        if (cn === "出生日期" && val_str !== "") {
          const parts = val_str.split('-');
          if (parts.length === 3) {
            md.push(`- **出生日期**：${parts[0]} 年 ${parseInt(parts[1], 10)} 月 ${parseInt(parts[2], 10)} 日`);
          } else {
            md.push(`- **出生日期**：${val_str}`);
          }
        } else {
          md.push(`- **${cn}**：${val_str}`);
        }
      }
    });
    md.push("");
    
    const objective = data.career_objective || {};
    md.push("## 求职意向\n");
    const cities = (objective.preferred_cities || []).join("/");
    md.push(`- **期望城市**：${cities}`);
    md.push(`- **期望薪资**：${objective.expected_salary || ""}`);
    md.push(`- **到岗时间**：${objective.onboard_time || ""}\n`);
    
    const eduList = data.education || [];
    md.push("## 教育经历\n");
    eduList.forEach(edu => {
      md.push(`- **${edu.degree || "学位"}**：\n`);
      md.push(`  - **时间**：${getPeriodString(edu)}`);
      md.push(`  - **所在院系/研究所**：${edu.institution || ""}`);
      md.push(`  - **受教育类型**：${edu.enrollment_type || ""}`);
      const courses = (edu.courses || []).join(", ");
      md.push(`  - **专业课程**：${courses}`);
      md.push(`  - **该学历是否为交流学习**：${edu.is_exchange ? "是" : "否"}`);
      md.push(`  - **该学历是否为联合办学**：${edu.is_joint ? "是" : "否"}`);
      md.push(`  - **专业类别**：${edu.major_category || ""}`);
      md.push(`  - **专业**：${edu.major || ""}`);
      if (edu.college) md.push(`  - **学院**：${edu.college}`);
      md.push(`  - **成绩排名**：${edu.ranking || ""}`);
      md.push(`  - **GPA**：${edu.gpa || ""}`);
      md.push(`  - **学校所在地**：${edu.location || ""}`);
      md.push(`  - **导师姓名**：${edu.advisor || ""}`);
      md.push(`  - **是否国家重点实验室**：${edu.is_key_lab ? "是" : "否"}`);
      md.push(`  - **所在实验室**：${edu.laboratory || ""}\n`);
    });
    md.push(`- **是否有在职亲属**：${data.has_working_relatives ? "是" : "否"}`);
    md.push(`- **是否有工作经历**：${data.has_work_experience ? "是" : "否"}\n`);
    
    const skillList = data.skills_and_certificates || [];
    md.push("## 其他技能/证书\n");
    skillList.forEach(sk => {
      md.push(`- **技能/证书名称**：${sk.name || ""}\n`);
      md.push(`- **详情**：${sk.details || ""}\n`);
    });

    if (data.has_research_papers) {
      const paperList = data.papers || [];
      md.push("## 论文\n");
      paperList.forEach(pap => {
        md.push(`- **名称**：${pap.title || ""}\n`);
        md.push(`- **所属刊物**：${pap.journal || ""}\n`);
        md.push(`- **作者顺序**：${pap.author_order || ""}\n`);
        md.push(`- **发表时间**：${pap.publish_time || ""}\n`);
        if (pap.details) md.push(`- **详情**：${pap.details}\n`);
      });
    }

    if (data.has_projects) {
      const projList = data.projects || [];
      md.push("## 项目经历\n");
      projList.forEach(proj => {
        md.push(`- **项目名称**：${proj.name || ""}\n`);
        md.push(`- **起止时间**：${getPeriodString(proj)}\n`);
        md.push(`- **项目角色**：${proj.role || ""}\n`);
        if (proj.responsibilities_summary) {
          md.push(`- **主要职责**：${proj.responsibilities_summary}\n`);
        }
        md.push(`- **项目介绍**：${proj.description || ""}\n`);
        md.push("- **项目职责**：");
        (proj.responsibilities || []).forEach(resp => {
          md.push(`  - ${resp}`);
        });
        md.push("");
      });
    }
    
    if (data.has_awards && data.awards && data.awards.length > 0) {
      md.push("## 竞赛/获奖经历\n");
      const groups = {};
      data.awards.forEach(aw => {
        if (!aw.name || !aw.date) return;
        const yearRange = getAwardAcademicYear(aw.date);
        if (!groups[yearRange]) groups[yearRange] = [];
        let nameStr = aw.name;
        if (aw.level) nameStr += ` (${aw.level})`;
        groups[yearRange].push(nameStr);
      });
      const sortedYears = Object.keys(groups).sort((a, b) => b.localeCompare(a));
      sortedYears.forEach(yearRange => {
        md.push(`- **${yearRange}**：${groups[yearRange].join("，")}`);
      });
      md.push("");
    }

    if (data.has_student_leadership) {
      const leaderList = data.student_leadership || [];
      md.push("## 学生干部经历\n");
      leaderList.forEach(leader => {
        md.push(`- **职位**：${leader.role || ""}\n`);
        md.push(`- **级别**：${leader.level || ""}\n`);
        md.push(`- **时间**：${getPeriodString(leader)}\n`);
        md.push("- **工作职责**：");
        (leader.responsibilities || []).forEach(resp => {
          md.push(`  - ${resp}`);
        });
        md.push("");
      });
      md.push(`- **有无校内活动经历**：${data.has_campus_activities ? "是" : "否"}\n`);
    }
    
    if (data.has_languages) {
      const langList = data.languages || [];
      md.push("## 语言能力\n");
      langList.forEach(lang => {
        md.push(`- **语种**：${lang.language || ""}`);
        md.push(`- **语言证书**：${lang.certificate || ""}`);
        md.push(`- **分数**：${lang.score || ""}\n`);
      });
    }
    
    if (data.has_portfolio) {
      const portList = data.portfolio || [];
      md.push("## 作品\n");
      portList.forEach(p => {
        md.push(`- **作品名称**：${p.name || ""}\n`);
        md.push(`- **链接/描述**：${p.url_or_description || ""}\n`);
      });
    }

    if (data.has_patents) {
      const patentList = data.patents || [];
      md.push("## 发明专利\n");
      patentList.forEach(pat => {
        md.push(`- **专利名称**：${pat.name || ""}\n`);
        md.push(`- **专利号**：${pat.patent_number || ""}\n`);
        md.push(`- **申请时间**：${pat.application_time || ""}\n`);
      });
    }
    
    if (data.has_family) {
      const family = data.family_members || [];
      md.push("## 家庭成员\n");
      family.forEach(fam => {
        md.push(`- ${fam.role}：${fam.name || ""}，工作单位：${fam.organization || ""}，职业：${fam.job || ""}\n`);
      });
    }
    
    if (data.has_self_evaluation) {
      md.push("## 自我评价\n");
      md.push(data.self_evaluation || "");
      md.push("");
    }
    
    return md.join("\n");
  };

  const generateLaTeX = (data) => {
    const basic = data.basic_info || {};
    const eduList = data.education || [];
    const skillList = data.skills_and_certificates || [];
    const projList = data.projects || [];
    
    const esc = (str) => {
      if (!str) return '';
      return str
        .replace(/\\/g, '\\\\')
        .replace(/&/g, '\\&')
        .replace(/%/g, '\\%')
        .replace(/\$/g, '\\$')
        .replace(/#/g, '\\#')
        .replace(/_/g, '\\_')
        .replace(/{/g, '\\{')
        .replace(/}/g, '\\}')
        .replace(/~/g, '\\textasciitilde')
        .replace(/\^/g, '\\textasciicircum');
    };

    const getGithubTex = (val) => {
      if (!val) return '';
      let url = val;
      let username = val;
      if (!val.startsWith('http')) {
        url = `https://github.com/${val}`;
      } else {
        const match = val.match(/github\.com\/([^/]+)/);
        if (match) username = match[1];
      }
      return `\\faGithub{\\href{${url}}{${username}}}`;
    };

    const getLinkedinTex = (val) => {
      if (!val) return '';
      let url = val;
      let username = val;
      if (!val.startsWith('http')) {
        url = `https://linkedin.com/in/${val}`;
      } else {
        const match = val.match(/linkedin\.com\/in\/([^/]+)/);
        if (match) username = match[1];
      }
      return `\\faLinkedin{\\href{${url}}{${username}}}`;
    };

    const getHomepageTex = (val) => {
      if (!val) return '';
      let url = val;
      let display = val.replace(/^https?:\/\//, '');
      if (!val.startsWith('http')) {
        url = `https://${val}`;
      }
      return `\\faLink{\\href{${url}}{${display}}}`;
    };

    const formatTexDate = (dateStr) => {
      if (!dateStr) return '';
      const parts = dateStr.split('-');
      if (parts.length === 2) {
        return `${parts[0]}年${parseInt(parts[1], 10)}月`;
      }
      return dateStr;
    };

    const getPeriodStringTex = (item) => {
      const start = formatTexDate(item.period_start);
      if (item.is_present) {
        return `${start} -- 至今`;
      }
      const end = formatTexDate(item.period_end);
      return `${start} -- ${end}`;
    };

    // Calculate LaTeX Margins depending on customizer margin choice
    let marginVal = '1.2cm';
    if (previewMargin === 'tight') marginVal = '0.8cm';
    else if (previewMargin === 'loose') marginVal = '1.6cm';

    let tex = [];
    tex.push("% !TEX TS-program = xelatex");
    tex.push("% !TEX encoding = UTF-8 Unicode");
    tex.push("");
    tex.push("\\documentclass{resume}");
    
    // Dynamically write Chinese font package option
    tex.push("\\usepackage{zh_CN-Adobefonts_external}");
    tex.push("\\usepackage{linespacing_fix}");
    tex.push("\\usepackage{cite}");
    tex.push("\\usepackage{geometry}");
    tex.push(`\\geometry{a4paper,left=${marginVal},right=${marginVal},top=${marginVal},bottom=${marginVal},footskip=0.6cm}`);
    tex.push("");
    tex.push("% Set exact font styles");
    tex.push("\\setmainfont{Times New Roman}");
    tex.push("");
    tex.push("% Page numbering configuration");
    tex.push("\\usepackage{fancyhdr}");
    tex.push("\\pagestyle{fancy}");
    tex.push("\\fancyhf{}");
    tex.push("\\renewcommand{\\headrulewidth}{0pt}");
    tex.push("\\cfoot{\\small 第~\\thepage~页}");
    tex.push("");
    tex.push("% Compact layout spacing overrides");
    tex.push("\\titlespacing*{\\section}{0cm}{1.2ex}{1.0ex}");
    tex.push("\\titlespacing*{\\subsection}{0cm}{1.0ex}{0.5ex}");
    tex.push("\\setlist[itemize]{nosep, leftmargin=1.5pc}");
    tex.push("");
    
    // Dynamic section underlining config (standardization optimization)
    if (previewSectionStyle === 'underline') {
      tex.push("% Section Title style: Underlined");
    } else if (previewSectionStyle === 'minimalist') {
      tex.push("% Section Title style: Minimalist (no lines)");
      tex.push("\\titleformat{\\section}{\\large\\bfseries}{\\thesection}{1em}{}");
    }

    tex.push("\\begin{document}");
    tex.push("\\pagenumbering{arabic}");
    tex.push("");
    
    tex.push(`\\name{${esc(basic.name)}}`);
    
    const basicParts = [];
    if (basic.email) basicParts.push(`\\email{${esc(basic.email)}}`);
    if (basic.phone) basicParts.push(`\\phone{${esc(basic.phone)}}`);
    if (basic.show_birth_date !== false && basic.birth_date) {
      const parts = basic.birth_date.split('-');
      const formattedBirth = parts.length === 3 
        ? `${parts[0]}年${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日` 
        : basic.birth_date;
      basicParts.push(`\\faCalendar{${esc(formattedBirth)}}`);
    }
    if (basic.gender) {
      basicParts.push(`\\faGroup {${esc(basic.gender)}}`);
    }
    if (basic.github) {
      const githubTex = getGithubTex(basic.github);
      if (githubTex) basicParts.push(githubTex);
    }
    if (basic.linkedin) {
      const linkedinTex = getLinkedinTex(basic.linkedin);
      if (linkedinTex) basicParts.push(linkedinTex);
    }
    if (basic.homepage) {
      const homepageTex = getHomepageTex(basic.homepage);
      if (homepageTex) basicParts.push(homepageTex);
    }
    
    tex.push("\\basicInfo{");
    tex.push(`\t${basicParts.join(' \\textperiodcentered\\ \n\t')}`);
    tex.push("}");
    tex.push("");

    if (eduList.length > 0) {
      tex.push("%% 教育背景");
      tex.push("\\section{教育背景}");
      tex.push("");
      eduList.forEach(edu => {
        tex.push(`\\datedsubsection{\\textbf{${esc(edu.institution)}} \\ ${esc(edu.major)} \\ ${esc(edu.degree)}}{${getPeriodStringTex(edu)}}`);
        const courseStr = edu.courses ? edu.courses.join('、') : '';
        let detailParts = [];
        if (edu.gpa) detailParts.push(`\\textit{GPA：}\\ ${esc(edu.gpa)}`);
        if (edu.ranking) detailParts.push(`\\textit{排名：}\\ ${esc(edu.ranking)}`);
        if (courseStr) detailParts.push(`\\textit{相关课程：}\\ ${esc(courseStr)}`);
        
        if (detailParts.length > 0) {
          tex.push("\\begin{itemize}");
          tex.push(`    \\item ${detailParts.join('\\ ')}`);
          tex.push("\\end{itemize}");
        }
        tex.push("");
      });
    }

    if (skillList.length > 0) {
      tex.push("% =============================================================================");
      tex.push("% 技能与兴趣");
      tex.push("% =============================================================================");
      tex.push("\\section{\\textbf{技能与兴趣}}");
      tex.push("\\begin{onehalfspacing}");
      tex.push("\\begin{itemize}");
      skillList.forEach(sk => {
        const skName = (sk.name || "").trim().replace(/[:：]$/, '');
        tex.push(`    \\item \\textbf{${esc(skName)}：} ${esc(sk.details)}`);
      });
      tex.push("\\end{itemize}");
      tex.push("\\end{onehalfspacing}");
      tex.push("");
    }

    if (projList.length > 0) {
      tex.push("%% 科研经历");
      tex.push("\\section{项目经历}");
      tex.push("");
      projList.forEach(proj => {
        tex.push(`\\datedsubsection{\\textbf{${esc(proj.name)}} \\ ${esc(proj.role)}}{${getPeriodStringTex(proj)}}`);
        tex.push("\\begin{onehalfspacing}");
        tex.push(`    \\textbf{项目简介：} ${esc(proj.description)}\\\\`);
        tex.push(`    \\textbf{主要职责：} ${esc(proj.responsibilities_summary || '负责该项目的核心开发与系统验证。')}\\\\`);
        tex.push("    \\textbf{亮点：}");
        if (proj.responsibilities && proj.responsibilities.length > 0) {
          tex.push("    \\begin{itemize}");
          proj.responsibilities.forEach(resp => {
            const colonMatch = resp.match(/^(.*?[：:])\s*(.*)$/);
            if (colonMatch) {
              const prefix = colonMatch[1].trim().replace(/[:：]$/, '：');
              tex.push(`        \\item \\textbf{${esc(prefix)}} ${esc(colonMatch[2])}`);
            } else {
              tex.push(`        \\item ${esc(resp)}`);
            }
          });
          tex.push("    \\end{itemize}");
        }
        tex.push("\\end{onehalfspacing}");
        tex.push("");
      });
    }

    if (data.has_awards && data.awards && data.awards.length > 0) {
      tex.push("%% 所获荣誉");
      tex.push("\\section{所获荣誉}");
      
      const groups = {};
      data.awards.forEach(aw => {
        if (!aw.name || !aw.date) return;
        const yearRange = getAwardAcademicYear(aw.date);
        const texYearRange = cleanAcademicYearTex(yearRange);
        if (!groups[texYearRange]) groups[texYearRange] = [];
        let nameStr = aw.name;
        if (aw.level) nameStr += ` (${aw.level})`;
        groups[texYearRange].push(nameStr);
      });
      
      const sortedYears = Object.keys(groups).sort((a, b) => b.localeCompare(a));
      sortedYears.forEach(yearRange => {
        tex.push(`\\datedsubsection{\\textbf{${yearRange}}}{\\ ${groups[yearRange].join('，')}}`);
      });
      tex.push("");
    }

    tex.push("\\end{document}");
    return tex.join("\n");
  };

  const getPromptForField = (path, text) => {
    if (path.startsWith('project')) {
      return `你是一名专业求职顾问与简历优化专家。请帮我优化以下简历中的“项目经历”内容。

【优化要求】
1. 限制长度：内容要精炼紧凑，每个部分控制在几行以内，方便一页简历排版。
2. 突出技术栈：将我使用到的关键技术名词（如 C/C++、Python、RT-Thread、FPGA、深度学习等）自然融入其中。
3. 写作规范：必须严格且清晰地按照以下三个条目（使用加粗标题）进行润色输出：
   - **项目简介**：一两句话简述该项目的主要功能、背景和最终应用场景。
   - **我的职责**：以清晰 of bullet points 阐述我负责的具体模块、开发工作或算法实现，重点突出我的职责与贡献。
   - **我的收获**：总结我通过该项目学习或掌握的具体技术栈以及解决问题的实践经验。

【待优化的草稿内容】
${text}`;
    } else if (path === 'self_evaluation') {
      return `你是一名专业简历优化专家。请帮我优化以下自我评价内容。

【优化要求】
1. 限制长度：控制在 100-150 字左右，确保段落精炼。
2. 突出技术栈：突出我擅长的专业核心技术栈和专业实力。
3. 写作规范：行文流畅，去除主语，使用专业词汇，体现出自我驱动力和工程解决能力。

【待优化的草稿内容】
${text}`;
    } else {
      return `你是一名专业简历优化专家。请帮我优化以下简历技能详情描述。

【优化要求】
1. 限制长度：条理清晰，每条不超过两行。
2. 突出技术栈：确保技术名词拼写正确且归类专业。
3. 写作规范：用词严明，体现对相关技术栈的熟练度和实际应用能力。

【待优化的草稿内容】
${text}`;
    }
  };

  const renderResumeSheet = () => {
    const showBirth = resume.basic_info.show_birth_date !== false && resume.basic_info.birth_date;
    let formattedBirthDate = '';
    if (showBirth) {
      const parts = resume.basic_info.birth_date.split('-');
      if (parts.length === 3) {
        formattedBirthDate = `${parts[0]}年${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
      } else {
        formattedBirthDate = resume.basic_info.birth_date;
      }
    }

    const emailDisplay = resume.basic_info.email || '';
    const phoneDisplay = resume.basic_info.phone || '';
    const genderDisplay = resume.basic_info.gender || '';
    const githubDisplay = resume.basic_info.github || '';
    const linkedinDisplay = resume.basic_info.linkedin || '';
    const homepageDisplay = resume.basic_info.homepage || '';

    const subtitleParts = [];
    if (emailDisplay) subtitleParts.push(emailDisplay);
    if (phoneDisplay) subtitleParts.push(phoneDisplay);
    if (formattedBirthDate) subtitleParts.push(`${formattedBirthDate}出生`);
    if (genderDisplay) subtitleParts.push(genderDisplay);
    
    if (githubDisplay) {
      const displayGit = githubDisplay.replace(/^https?:\/\/(www\.)?github\.com\//, '');
      subtitleParts.push(<a href={githubDisplay.startsWith('http') ? githubDisplay : `https://${githubDisplay}`} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>GitHub: {displayGit}</a>);
    }
    if (linkedinDisplay) {
      const displayIn = linkedinDisplay.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '');
      subtitleParts.push(<a href={linkedinDisplay.startsWith('http') ? linkedinDisplay : `https://${linkedinDisplay}`} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>LinkedIn: {displayIn}</a>);
    }
    if (homepageDisplay) {
      const displayWeb = homepageDisplay.replace(/^https?:\/\//, '');
      subtitleParts.push(<a href={homepageDisplay.startsWith('http') ? homepageDisplay : `https://${homepageDisplay}`} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>主页: {displayWeb}</a>);
    }

    // Determine customizer-based styles (classic, warm, academic, midnight)
    let sheetBg = '#ffffff';
    let textColor = '#1f2937';
    let subTextColor = '#4b5563';
    let accentBorder = '#3b82f6';
    let fontName = 'var(--font-sans)';

    if (previewTheme === 'warm') {
      sheetBg = '#fdfaf2';
      textColor = '#2c251b';
      subTextColor = '#60523e';
      accentBorder = '#c27803';
    } else if (previewTheme === 'academic') {
      sheetBg = '#f8fafc';
      textColor = '#0f172a';
      subTextColor = '#334155';
      accentBorder = '#0284c7';
    } else if (previewTheme === 'midnight') {
      sheetBg = '#0b0f19';
      textColor = '#f3f4f6';
      subTextColor = '#9ca3af';
      accentBorder = '#8b5cf6';
    }

    // Determine margins
    let padSize = '30px';
    if (previewMargin === 'tight') padSize = '15px';
    else if (previewMargin === 'loose') padSize = '45px';

    const headerLineStyle = previewSectionStyle === 'underline' 
      ? { borderBottom: `2px solid ${accentBorder}`, paddingBottom: '3px' }
      : previewSectionStyle === 'border-left'
      ? { borderLeft: `4px solid ${accentBorder}`, paddingLeft: '10px' }
      : { textTransform: 'uppercase', letterSpacing: '0.05em' };

    return (
      <div className="preview-sheet" style={{ background: sheetBg, color: textColor, padding: padSize, fontSize: previewFontSize, fontFamily: fontName, transition: 'all 0.2s ease' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '5px', fontSize: '26px', color: textColor }}>{resume.basic_info.name || "姓名"}</h1>
        <p style={{ textAlign: 'center', color: subTextColor, fontSize: '13px', marginBottom: '25px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {subtitleParts.map((part, pIdx) => (
            <React.Fragment key={pIdx}>
              {pIdx > 0 && <span style={{ color: '#d1d5db' }}>·</span>}
              <span>{part}</span>
            </React.Fragment>
          ))}
        </p>

        <h2 style={headerLineStyle}>🎓 教育背景</h2>
        {resume.education && resume.education.length > 0 ? (
          resume.education.map((edu, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{edu.institution} ({edu.degree})</span>
                <span>{getPeriodString(edu)}</span>
              </div>
              <div style={{ fontSize: '13px', color: subTextColor }}>
                专业：{edu.major} | GPA: {edu.gpa} | 排名：{edu.ranking}
              </div>
              {edu.courses && edu.courses.length > 0 && (
                <div style={{ fontSize: '12px', color: subTextColor, marginTop: '2px' }}>
                  相关课程：{edu.courses.join(", ")}
                </div>
              )}
            </div>
          ))
        ) : <p style={{ fontSize: '13px', color: '#9ca3af' }}>（暂无教育经历）</p>}

        <h2 style={headerLineStyle}>🛠️ 技能与兴趣</h2>
        {resume.skills_and_certificates && resume.skills_and_certificates.length > 0 ? (
          resume.skills_and_certificates.map((sk, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <strong>{sk.name}：</strong>
              <span style={{ fontSize: '13px', color: subTextColor }}>{sk.details}</span>
            </div>
          ))
        ) : <p style={{ fontSize: '13px', color: '#9ca3af' }}>（暂无技能信息）</p>}

        {resume.has_research_papers && resume.papers && resume.papers.length > 0 && (
          <div>
            <h2 style={headerLineStyle}>📝 科研论文</h2>
            {resume.papers.map((pap, idx) => (
              <div key={idx} style={{ marginBottom: '8px', fontSize: '13px' }}>
                • <strong>{pap.author_order}</strong>. “{pap.title}” <em>{pap.journal}</em>. ({pap.publish_time})
              </div>
            ))}
          </div>
        )}

        {resume.has_projects && resume.projects && resume.projects.length > 0 && (
          <div>
            <h2 style={headerLineStyle}>🚀 项目经历</h2>
            {resume.projects.map((proj, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>{proj.name}</span>
                  <span>{getPeriodString(proj)}</span>
                </div>
                <div style={{ fontWeight: '600', color: accentBorder, fontSize: '13px' }}>项目角色: {proj.role}</div>
                <p style={{ fontSize: '13px', color: subTextColor, margin: '5px 0' }}>{proj.description}</p>
                {proj.responsibilities_summary && (
                  <div style={{ fontSize: '13px', color: textColor, marginBottom: '5px' }}>
                    <strong>主要职责：</strong>{proj.responsibilities_summary}
                  </div>
                )}
                {proj.responsibilities && proj.responsibilities.length > 0 && (
                  <ul style={{ fontSize: '13px', paddingLeft: '20px', marginTop: '5px', color: subTextColor }}>
                    {proj.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {resume.has_awards && resume.awards && resume.awards.length > 0 && (
          <div>
            <h2 style={headerLineStyle}>🏆 所获荣誉</h2>
            {(() => {
              const groups = {};
              resume.awards.forEach(aw => {
                if (!aw.name || !aw.date) return;
                const yearRange = getAwardAcademicYear(aw.date);
                if (!groups[yearRange]) groups[yearRange] = [];
                let nameStr = aw.name;
                if (aw.level) nameStr += ` (${aw.level})`;
                groups[yearRange].push(nameStr);
              });
              const sortedYears = Object.keys(groups).sort((a, b) => b.localeCompare(a));
              return sortedYears.map((yearRange, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span style={{ fontWeight: '500' }}>• {groups[yearRange].join("，")}</span>
                  <span style={{ fontFamily: 'monospace', color: subTextColor }}>{yearRange}</span>
                </div>
              ));
            })()}
          </div>
        )}

        {resume.has_self_evaluation && resume.self_evaluation && (
          <div>
            <h2 style={headerLineStyle}>📝 自我评价</h2>
            <p style={{ whiteSpace: 'pre-line', fontSize: '13px', color: textColor }}>{resume.self_evaluation}</p>
          </div>
        )}
        
        {/* Visualized Page Footer for Preview */}
        <div style={{ marginTop: '30px', borderTop: `1px solid ${accentBorder}`, paddingTop: '10px', textAlign: 'center', fontSize: '11px', color: subTextColor }}>
          第 1 页
        </div>
      </div>
    );
  };

  const handleExportJSON = () => {
    if (!validateForm()) {
      alert("表单中存在格式或必填错误，请修正红框区域后再导出！");
      return;
    }
    const outputResume = JSON.parse(JSON.stringify(resume));
    if (outputResume.basic_info.show_birth_date === false) {
      outputResume.basic_info.birth_date = "";
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(outputResume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.basic_info.name || 'resume'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportMarkdown = () => {
    if (!validateForm()) {
      alert("表单中存在格式或必填错误，请修正红框区域后再导出！");
      return;
    }
    const mdContent = generateMarkdown(resume);
    const dataStr = "data:text/markdown;charset=utf-8," + encodeURIComponent(mdContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.basic_info.name || 'resume'}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportLaTeX = () => {
    if (!validateForm()) {
      alert("表单中存在格式或必填错误，请检查红框部分后导出！");
      return;
    }
    const texContent = generateLaTeX(resume);
    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(texContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resume.basic_info.name || 'resume'}.tex`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handlePrintPDF = () => {
    if (!validateForm()) {
      alert("表单中存在格式或必填错误，请检查红框部分后打印！");
      return;
    }
    window.print();
  };

  const openAiDialog = (fieldPath, initialText, index = null, subIndex = null) => {
    setAiActiveField({ path: fieldPath, index, subIndex });
    setAiInput(initialText);
    setAiOutput('');
  };

  const applyAiPolish = () => {
    if (!aiOutput.trim()) return;
    const { path, index, subIndex } = aiActiveField;
    if (path === 'self_evaluation') {
      setResume(prev => ({ ...prev, self_evaluation: aiOutput }));
    } else if (path === 'project_description') {
      handleArrayItemChange('projects', index, 'description', aiOutput);
    } else if (path === 'project_responsibilities') {
      handleResponsibilityChange('projects', index, subIndex, aiOutput);
    } else if (path === 'skills_details') {
      handleArrayItemChange('skills_and_certificates', index, 'details', aiOutput);
    }
    setAiActiveField(null);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header>
        <div className="logo">
          <h1>⚡ CV Builder Studio <span style={{fontSize: '13px', color: 'var(--text-secondary)'}}>在线简历编辑与排版渲染系统</span></h1>
        </div>
        
        {/* Real-time Schema validation status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', padding: '6px 12px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', border: '1px solid var(--glass-border)' }} onClick={() => setShowDiagnosticsLog(prev => !prev)}>
          {schemaDiagnostics.length === 0 ? (
            <span style={{ color: 'var(--success)', fontWeight: '600' }}>● JSON Schema 诊断合规</span>
          ) : (
            <span style={{ color: 'var(--danger)', fontWeight: '600' }}>● Schema 诊断异常 ({schemaDiagnostics.length}项警告)</span>
          )}
          <span style={{ color: 'var(--text-secondary)' }}>{showDiagnosticsLog ? '▲ 收起' : '▼ 展开详情'}</span>
        </div>

        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleExportLaTeX}>📄 导出 LaTeX</button>
          <button className="btn btn-secondary" onClick={handleExportJSON}>📥 导出 JSON</button>
          <button className="btn btn-secondary" onClick={handleExportMarkdown}>📥 导出 Markdown</button>
          <button className="btn btn-primary" onClick={handlePrintPDF}>🖨️ 打印 / 导出 PDF</button>
        </div>
      </header>

      {/* Diagnostics log console dropdown */}
      {showDiagnosticsLog && (
        <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '15px 25px', marginBottom: '20px', fontSize: '13px' }}>
          <h4 style={{ color: 'var(--danger)', marginBottom: '8px' }}>⚠️ 简历标准化 Schema 实时诊断报告：</h4>
          {schemaDiagnostics.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)' }}>暂无任何格式或必填错误，简历结构100%符合标准化 schema 设计规范。</p>
          ) : (
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {schemaDiagnostics.map((err, idx) => (
                <li key={idx} style={{ color: 'var(--text-primary)' }}>
                  <strong style={{ color: err.severity === 'error' ? 'var(--danger)' : '#fbbf24', marginRight: '8px' }}>[{err.severity.toUpperCase()}]</strong>
                  {err.msg}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Main Workspace splits form vs preview */}
      <div className="workspace">
        {/* Form Panel */}
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">📝 编辑简历字段 (带 <span className="required-star">*</span> 为必填项)</div>
          </div>
          <div className="panel-body">
            
            {/* MODULE 1: Basic Info */}
            <div className={`form-section ${expandedSections.basic ? 'expanded' : ''}`}>
              <div className="form-section-header" onClick={() => toggleSection('basic')}>
                <span>👤 1. 个人信息 (基本资料)</span>
                <span>{expandedSections.basic ? '▼' : '▲'}</span>
              </div>
              {expandedSections.basic && (
                <div className="form-section-body">
                  <div className="form-group">
                    <label>姓名 <span className="required-star">*</span></label>
                    <input 
                      className={`form-control ${errors['basic_info.name'] ? 'invalid' : ''}`} 
                      type="text" 
                      value={resume.basic_info.name || ''} 
                      onChange={(e) => handleBasicChange('name', e.target.value)} 
                    />
                    {errors['basic_info.name'] && <span className="error-text">{errors['basic_info.name']}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label>性别 (可选)</label>
                    <select 
                      className="form-control"
                      value={resume.basic_info.gender || ''} 
                      onChange={(e) => handleBasicChange('gender', e.target.value)}
                    >
                      <option value="">不显示/不填写</option>
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label>出生日期 (可选)</label>
                    <input 
                      className="form-control" 
                      type="date" 
                      value={resume.basic_info.birth_date || ''} 
                      onChange={(e) => handleBasicChange('birth_date', e.target.value)} 
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input 
                        type="checkbox" 
                        checked={resume.basic_info.show_birth_date !== false} 
                        onChange={(e) => handleBasicChange('show_birth_date', e.target.checked)} 
                      />
                      在预览简历中渲染并显示出生日期
                    </label>
                  </div>

                  <div className="form-group">
                    <label>联系电话</label>
                    <input 
                      className={`form-control ${errors['basic_info.phone'] ? 'invalid' : ''}`} 
                      type="text" 
                      placeholder="如 +86 138-1234-5678"
                      value={resume.basic_info.phone || ''} 
                      onChange={(e) => handleBasicChange('phone', e.target.value)} 
                    />
                    {errors['basic_info.phone'] && <span className="error-text">{errors['basic_info.phone']}</span>}
                  </div>

                  <div className="form-group">
                    <label>电子邮箱</label>
                    <input 
                      className={`form-control ${errors['basic_info.email'] ? 'invalid' : ''}`} 
                      type="text" 
                      placeholder="如 example@domain.com"
                      value={resume.basic_info.email || ''} 
                      onChange={(e) => handleBasicChange('email', e.target.value)} 
                    />
                    {errors['basic_info.email'] && <span className="error-text">{errors['basic_info.email']}</span>}
                  </div>

                  <div className="form-group">
                    <label>GitHub 链接 (可选)</label>
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="如 https://github.com/username"
                      value={resume.basic_info.github || ''} 
                      onChange={(e) => handleBasicChange('github', e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label>LinkedIn 链接 (可选)</label>
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="如 https://linkedin.com/in/username"
                      value={resume.basic_info.linkedin || ''} 
                      onChange={(e) => handleBasicChange('linkedin', e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label>个人主页 / 博客 (可选)</label>
                    <input 
                      className="form-control" 
                      type="text" 
                      placeholder="如 https://mywebsite.com"
                      value={resume.basic_info.homepage || ''} 
                      onChange={(e) => handleBasicChange('homepage', e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label>政治面貌</label>
                    <select className="form-control" value={resume.basic_info.political_status || ''} onChange={(e) => handleBasicChange('political_status', e.target.value)}>
                      <option value="中共党员">中共党员</option>
                      <option value="共青团员">共青团员</option>
                      <option value="群众">群众</option>
                      <option value="食死徒领袖">食死徒领袖</option>
                      <option value="其他">其他</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>意向面试地点</label>
                    <input className="form-control" type="text" value={resume.basic_info.interview_location || ''} onChange={(e) => handleBasicChange('interview_location', e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            {/* MODULE 2: Education */}
            <div className={`form-section ${expandedSections.education ? 'expanded' : ''}`}>
              <div className="form-section-header" onClick={() => toggleSection('education')}>
                <span>🎓 2. 教育背景</span>
                <span>{expandedSections.education ? '▼' : '▲'}</span>
              </div>
              {expandedSections.education && (
                <div className="form-section-body col-span-2" style={{ display: 'block' }}>
                  <div className="repeating-list">
                    {resume.education.map((edu, idx) => (
                      <div key={idx} className="repeating-item">
                        <div className="repeating-item-header">
                          <span className="repeating-item-title">#{idx + 1} {edu.degree || '学历/学位'}</span>
                          <button className="btn btn-danger btn-icon" onClick={() => removeArrayItem('education', idx)}>🗑️</button>
                        </div>
                        
                        <div className="form-group">
                          <label>学校名称 <span className="required-star">*</span></label>
                          <input 
                            className={`form-control ${errors[`education.${idx}.institution`] ? 'invalid' : ''}`}
                            type="text" 
                            value={edu.institution || ''} 
                            onChange={(e) => handleArrayItemChange('education', idx, 'institution', e.target.value)} 
                          />
                          {errors[`education.${idx}.institution`] && <span className="error-text">{errors[`education.${idx}.institution`]}</span>}
                        </div>

                        <div className="form-group">
                          <label>专业名称 <span className="required-star">*</span></label>
                          <input 
                            className={`form-control ${errors[`education.${idx}.major`] ? 'invalid' : ''}`}
                            type="text" 
                            value={edu.major || ''} 
                            onChange={(e) => handleArrayItemChange('education', idx, 'major', e.target.value)} 
                          />
                          {errors[`education.${idx}.major`] && <span className="error-text">{errors[`education.${idx}.major`]}</span>}
                        </div>

                        <div className="form-group">
                          <label>学位级别 <span className="required-star">*</span></label>
                          <select 
                            className={`form-control ${errors[`education.${idx}.degree`] ? 'invalid' : ''}`}
                            value={edu.degree || ''} 
                            onChange={(e) => handleArrayItemChange('education', idx, 'degree', e.target.value)}
                          >
                            <option value="">请选择学位</option>
                            <option value="学士学位">学士学位</option>
                            <option value="硕士学位">硕士学位</option>
                            <option value="硕士研究生">硕士研究生</option>
                            <option value="博士研究生">博士研究生</option>
                            <option value="黑魔法高级进修">黑魔法高级进修</option>
                          </select>
                          {errors[`education.${idx}.degree`] && <span className="error-text">{errors[`education.${idx}.degree`]}</span>}
                        </div>

                        <div className="form-group">
                          <label>时间区间 (开始 - 结束) <span className="required-star">*</span></label>
                          <div className="date-range-inputs">
                            <input 
                              className={`form-control ${errors[`education.${idx}.period_start`] ? 'invalid' : ''}`}
                              type="month" 
                              value={edu.period_start || ''} 
                              onChange={(e) => handleArrayItemChange('education', idx, 'period_start', e.target.value)} 
                            />
                            <span className="date-range-separator">至</span>
                            {!edu.is_present && (
                              <input 
                                className={`form-control ${errors[`education.${idx}.period_end`] ? 'invalid' : ''}`}
                                type="month" 
                                value={edu.period_end || ''} 
                                onChange={(e) => handleArrayItemChange('education', idx, 'period_end', e.target.value)} 
                              />
                            )}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                              <input 
                                type="checkbox" 
                                checked={!!edu.is_present} 
                                onChange={(e) => handleArrayItemChange('education', idx, 'is_present', e.target.checked)} 
                              />
                              至今
                            </label>
                          </div>
                          {errors[`education.${idx}.period_start`] && <span className="error-text">{errors[`education.${idx}.period_start`]}</span>}
                          {!edu.is_present && errors[`education.${idx}.period_end`] && <span className="error-text">{errors[`education.${idx}.period_end`]}</span>}
                        </div>

                        <div className="form-group">
                          <label>GPA / 成绩分数</label>
                          <input className="form-control" type="text" placeholder="如 3.85/4.00 或 84.50/100" value={edu.gpa || ''} onChange={(e) => handleArrayItemChange('education', idx, 'gpa', e.target.value)} />
                        </div>

                        <div className="form-group">
                          <label>成绩排名</label>
                          <input className="form-control" type="text" placeholder="如 前15%" value={edu.ranking || ''} onChange={(e) => handleArrayItemChange('education', idx, 'ranking', e.target.value)} />
                        </div>

                        <div className="form-group col-span-2">
                          <label>专业核心课程 (以逗号分隔)</label>
                          <input className="form-control" type="text" placeholder="如 实时系统设计, 自主机器人系统" value={(edu.courses || []).join(', ')} onChange={(e) => handleArrayItemChange('education', idx, 'courses', e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-secondary" 
                    style={{ marginTop: '15px', width: '100%' }}
                    onClick={() => addArrayItem('education', { degree: '学士学位', period_start: '', period_end: '', is_present: false, institution: '', major: '', gpa: '', courses: [] })}
                  >
                    ➕ 添加学历学位
                  </button>

                  <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={!!resume.has_working_relatives} onChange={(e) => setResume(prev => ({ ...prev, has_working_relatives: e.target.checked }))} />
                      是否有在职亲属
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={!!resume.has_work_experience} onChange={(e) => setResume(prev => ({ ...prev, has_work_experience: e.target.checked }))} />
                      是否有工作经历
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* MODULE 3: Tech Stack */}
            <div className={`form-section ${expandedSections.skills ? 'expanded' : ''}`}>
              <div className="form-section-header" onClick={() => toggleSection('skills')}>
                <span>🛠️ 3. 技术栈 (技能与证书)</span>
                <span>{expandedSections.skills ? '▼' : '▲'}</span>
              </div>
              {expandedSections.skills && (
                <div className="form-section-body col-span-2" style={{ display: 'block' }}>
                  <div className="repeating-list">
                    {(resume.skills_and_certificates || []).map((sk, idx) => (
                      <div key={idx} className="repeating-item" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="repeating-item-header">
                          <span className="repeating-item-title">#{idx + 1} {sk.name || '技术领域'}</span>
                          <button className="btn btn-danger btn-icon" onClick={() => removeArrayItem('skills_and_certificates', idx)}>🗑️</button>
                        </div>
                        <div className="form-group" style={{ marginBottom: '10px' }}>
                          <label>技术领域 / 分类名称</label>
                          <input className="form-control" type="text" placeholder="如 嵌入式系统开发" value={sk.name || ''} onChange={(e) => handleArrayItemChange('skills_and_certificates', idx, 'name', e.target.value)} />
                        </div>
                        <div className="form-group">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label>技术详情描述</label>
                            <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '12px' }} onClick={() => openAiDialog('skills_details', sk.details || '', idx)}>✨ AI 复制助手</button>
                          </div>
                          <textarea className="form-control" placeholder="如 熟练掌握 C/C++ 多线程开发" value={sk.details || ''} onChange={(e) => handleArrayItemChange('skills_and_certificates', idx, 'details', e.target.value)} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-secondary" 
                    style={{ marginTop: '15px', width: '100%' }}
                    onClick={() => addArrayItem('skills_and_certificates', { name: '', details: '' })}
                  >
                    ➕ 添加技术领域 / 技能
                  </button>
                </div>
              )}
            </div>

            {/* MODULE 4: Research Papers */}
            <div className="section-toggle-container" onClick={() => setResume(prev => ({ ...prev, has_research_papers: !prev.has_research_papers }))}>
              <input type="checkbox" checked={!!resume.has_research_papers} onChange={() => {}} />
              <span className="section-toggle-label">📓 是否有科研经历 / 发表论文</span>
            </div>
            {resume.has_research_papers && (
              <div className={`form-section ${expandedSections.papers ? 'expanded' : ''}`}>
                <div className="form-section-header" onClick={() => toggleSection('papers')}>
                  <span>📚 4. 论文科研成果</span>
                  <span>{expandedSections.papers ? '▼' : '▲'}</span>
                </div>
                {expandedSections.papers && (
                  <div className="form-section-body col-span-2" style={{ display: 'block' }}>
                    <div className="repeating-list">
                      {(resume.papers || []).map((pap, idx) => (
                        <div key={idx} className="repeating-item">
                          <div className="repeating-item-header">
                            <span className="repeating-item-title">#{idx + 1} {pap.title || '论文标题'}</span>
                            <button className="btn btn-danger btn-icon" onClick={() => removeArrayItem('papers', idx)}>🗑️</button>
                          </div>
                          <div className="form-group col-span-2">
                            <label>论文标题</label>
                            <input className="form-control" type="text" value={pap.title || ''} onChange={(e) => handleArrayItemChange('papers', idx, 'title', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label>学术期刊 / 刊物名称</label>
                            <input className="form-control" type="text" value={pap.journal || ''} onChange={(e) => handleArrayItemChange('papers', idx, 'journal', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label>作者顺序</label>
                            <input className="form-control" type="text" placeholder="如 第一作者" value={pap.author_order || ''} onChange={(e) => handleArrayItemChange('papers', idx, 'author_order', e.target.value)} />
                          </div>
                          <div className="form-group">
                            <label>发表/录用时间</label>
                            <input className="form-control" type="text" placeholder="如 2026年03月" value={pap.publish_time || ''} onChange={(e) => handleArrayItemChange('papers', idx, 'publish_time', e.target.value)} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      style={{ marginTop: '15px', width: '100%' }}
                      onClick={() => addArrayItem('papers', { title: '', journal: '', author_order: '第一作者', publish_time: '' })}
                    >
                      ➕ 添加论文发表经历
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MODULE 5: Projects */}
            <div className="section-toggle-container" onClick={() => setResume(prev => ({ ...prev, has_projects: !prev.has_projects }))}>
              <input type="checkbox" checked={!!resume.has_projects} onChange={() => {}} />
              <span className="section-toggle-label">🚀 是否有项目经历 / 课程实践</span>
            </div>
            {resume.has_projects && (
              <div className={`form-section ${expandedSections.projects ? 'expanded' : ''}`}>
                <div className="form-section-header" onClick={() => toggleSection('projects')}>
                  <span>🛠️ 5. 项目背景</span>
                  <span>{expandedSections.projects ? '▼' : '▲'}</span>
                </div>
                {expandedSections.projects && (
                  <div className="form-section-body col-span-2" style={{ display: 'block' }}>
                    <div className="repeating-list">
                      {(resume.projects || []).map((proj, idx) => (
                        <div key={idx} className="repeating-item" style={{ display: 'flex', flexDirection: 'column' }}>
                          <div className="repeating-item-header">
                            <span className="repeating-item-title">#{idx + 1} {proj.name || '项目名称'}</span>
                            <button className="btn btn-danger btn-icon" onClick={() => removeArrayItem('projects', idx)}>🗑️</button>
                          </div>
                          
                          <div className="form-group" style={{ marginBottom: '10px' }}>
                            <label>项目名称 <span className="required-star">*</span></label>
                            <input 
                              className={`form-control ${errors[`projects.${idx}.name`] ? 'invalid' : ''}`}
                              type="text" 
                              value={proj.name || ''} 
                              onChange={(e) => handleArrayItemChange('projects', idx, 'name', e.target.value)} 
                            />
                            {errors[`projects.${idx}.name`] && <span className="error-text">{errors[`projects.${idx}.name`]}</span>}
                          </div>

                          <div className="form-group" style={{ marginBottom: '10px' }}>
                            <label>起止时间 <span className="required-star">*</span></label>
                            <div className="date-range-inputs">
                              <input 
                                className={`form-control ${errors[`projects.${idx}.period_start`] ? 'invalid' : ''}`}
                                type="month" 
                                value={proj.period_start || ''} 
                                onChange={(e) => handleArrayItemChange('projects', idx, 'period_start', e.target.value)} 
                              />
                              <span className="date-range-separator">至</span>
                              {!proj.is_present && (
                                <input 
                                  className={`form-control ${errors[`projects.${idx}.period_end`] ? 'invalid' : ''}`}
                                  type="month" 
                                  value={proj.period_end || ''} 
                                  onChange={(e) => handleArrayItemChange('projects', idx, 'period_end', e.target.value)} 
                              />
                              )}
                              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                                <input 
                                  type="checkbox" 
                                  checked={!!proj.is_present} 
                                  onChange={(e) => handleArrayItemChange('projects', idx, 'is_present', e.target.checked)} 
                                />
                                至今
                              </label>
                            </div>
                            {errors[`projects.${idx}.period_start`] && <span className="error-text">{errors[`projects.${idx}.period_start`]}</span>}
                            {!proj.is_present && errors[`projects.${idx}.period_end`] && <span className="error-text">{errors[`projects.${idx}.period_end`]}</span>}
                          </div>

                          <div className="form-group" style={{ marginBottom: '10px' }}>
                            <label>项目角色 <span className="required-star">*</span></label>
                            <input 
                              className={`form-control ${errors[`projects.${idx}.role`] ? 'invalid' : ''}`}
                              type="text" 
                              value={proj.role || ''} 
                              onChange={(e) => handleArrayItemChange('projects', idx, 'role', e.target.value)} 
                            />
                            {errors[`projects.${idx}.role`] && <span className="error-text">{errors[`projects.${idx}.role`]}</span>}
                          </div>

                          <div className="form-group" style={{ marginBottom: '10px' }}>
                            <label>主要职责 (一句话简述)</label>
                            <input 
                              className="form-control" 
                              type="text" 
                              placeholder="如：主导多模态数据采集与轻量化网络模型设计。" 
                              value={proj.responsibilities_summary || ''} 
                              onChange={(e) => handleArrayItemChange('projects', idx, 'responsibilities_summary', e.target.value)} 
                            />
                          </div>

                          <div className="form-group" style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <label>项目简介</label>
                              <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '12px' }} onClick={() => openAiDialog('project_description', proj.description || '', idx)}>✨ AI 复制助手</button>
                            </div>
                            <textarea className="form-control" value={proj.description || ''} onChange={(e) => handleArrayItemChange('projects', idx, 'description', e.target.value)} />
                          </div>

                          <div className="form-group">
                            <label>亮点经历与开发模块 (以“主题：内容”格式填写，可在LaTeX中自动加粗显示主题)</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '5px' }}>
                              {(proj.responsibilities || []).map((resp, rIdx) => (
                                <div key={rIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                  <input className="form-control" style={{ flex: 1 }} type="text" placeholder="如，网络模型设计：设计结合自注意力机制的故障诊断融合模型" value={resp} onChange={(e) => handleResponsibilityChange('projects', idx, rIdx, e.target.value)} />
                                  <button className="btn btn-secondary btn-icon" onClick={() => openAiDialog('project_responsibilities', resp, idx, rIdx)}>✨</button>
                                  <button className="btn btn-danger btn-icon" onClick={() => removeResponsibility('projects', idx, rIdx)}>🗑️</button>
                                </div>
                              ))}
                              <button className="btn btn-secondary" style={{ padding: '6px', fontSize: '13px' }} onClick={() => addResponsibility('projects', idx)}>➕ 添加亮点条目</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      style={{ marginTop: '15px', width: '100%' }}
                      onClick={() => addArrayItem('projects', { name: '', period_start: '', period_end: '', is_present: false, role: '', responsibilities_summary: '', description: '', responsibilities: [] })}
                    >
                      ➕ 添加项目经历
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MODULE 6: Awards */}
            <div className="section-toggle-container" onClick={() => setResume(prev => ({ ...prev, has_awards: !prev.has_awards }))}>
              <input type="checkbox" checked={!!resume.has_awards} onChange={() => {}} />
              <span className="section-toggle-label">🏆 是否有荣誉证书 / 获奖经历</span>
            </div>
            {resume.has_awards && (
              <div className={`form-section ${expandedSections.awards ? 'expanded' : ''}`}>
                <div className="form-section-header" onClick={() => toggleSection('awards')}>
                  <span>🏅 6. 所获荣誉</span>
                  <span>{expandedSections.awards ? '▼' : '▲'}</span>
                </div>
                {expandedSections.awards && (
                  <div className="form-section-body col-span-2" style={{ display: 'block' }}>
                    <p style={{fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '15px'}}>
                      💡 提示：您可直接使用<strong>年份与月份下拉菜单选择获奖日期</strong>，彻底免除手敲年份。系统将根据该日期自动折算对应的学年展示。
                    </p>
                    <div className="repeating-list">
                      {(resume.awards || []).map((aw, idx) => {
                        const dateStr = aw.date || '';
                        const [awYear, awMonth] = dateStr.split('-');
                        
                        return (
                          <div key={idx} className="repeating-item">
                            <div className="repeating-item-header">
                              <span className="repeating-item-title">#{idx + 1} {aw.name || '荣誉名称'}</span>
                              <button className="btn btn-danger btn-icon" onClick={() => removeArrayItem('awards', idx)}>🗑️</button>
                            </div>
                            
                            <div className="form-group col-span-2">
                              <label>荣誉/奖项全称 <span className="required-star">*</span></label>
                              <input 
                                className={`form-control ${errors[`awards.${idx}.name`] ? 'invalid' : ''}`}
                                type="text" 
                                placeholder="如 电子设计竞赛（校级）" 
                                value={aw.name || ''} 
                                onChange={(e) => handleArrayItemChange('awards', idx, 'name', e.target.value)} 
                              />
                              {errors[`awards.${idx}.name`] && <span className="error-text">{errors[`awards.${idx}.name`]}</span>}
                            </div>

                            <div className="form-group">
                              <label>获奖日期选择 <span className="required-star">*</span></label>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <select 
                                  className={`form-control ${errors[`awards.${idx}.date`] ? 'invalid' : ''}`}
                                  value={awYear || ''}
                                  onChange={(e) => {
                                    const year = e.target.value;
                                    const month = awMonth || '09';
                                    handleArrayItemChange('awards', idx, 'date', year ? `${year}-${month}` : '');
                                  }}
                                >
                                  <option value="">年份</option>
                                  {Array.from({ length: 26 }, (_, i) => 2010 + i).map(yr => (
                                    <option key={yr} value={yr}>{yr}年</option>
                                  ))}
                                </select>
                                <select 
                                  className={`form-control ${errors[`awards.${idx}.date`] ? 'invalid' : ''}`}
                                  value={awMonth || ''}
                                  onChange={(e) => {
                                    const year = awYear || new Date().getFullYear().toString();
                                    const month = e.target.value;
                                    handleArrayItemChange('awards', idx, 'date', month ? `${year}-${month}` : '');
                                  }}
                                >
                                  <option value="">月份</option>
                                  {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(mo => (
                                    <option key={mo} value={mo}>{mo}月</option>
                                  ))}
                                </select>
                              </div>
                              {errors[`awards.${idx}.date`] && <span className="error-text">{errors[`awards.${idx}.date`]}</span>}
                            </div>

                            <div className="form-group">
                              <label>级别</label>
                              <input className="form-control" type="text" placeholder="如 校级 / 国家级" value={aw.level || ''} onChange={(e) => handleArrayItemChange('awards', idx, 'level', e.target.value)} />
                            </div>

                            <div className="form-group col-span-2" style={{fontSize: '13px', color: 'var(--accent-secondary)'}}>
                              自动索引对应学年结果: {aw.date ? getAwardAcademicYear(aw.date) : '（请选择日期）'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button 
                      className="btn btn-secondary" 
                      style={{ marginTop: '15px', width: '100%' }}
                      onClick={() => addArrayItem('awards', { name: '', date: '', level: '校级', rank: '' })}
                    >
                      ➕ 添加荣誉获奖经历
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MODULE 7: Self Evaluation */}
            <div className="section-toggle-container" onClick={() => setResume(prev => ({ ...prev, has_self_evaluation: !prev.has_self_evaluation }))}>
              <input type="checkbox" checked={!!resume.has_self_evaluation} onChange={() => {}} />
              <span className="section-toggle-label">📝 是否有自我评价</span>
            </div>
            {resume.has_self_evaluation && (
              <div className={`form-section ${expandedSections.self ? 'expanded' : ''}`}>
                <div className="form-section-header" onClick={() => toggleSection('self')}>
                  <span>📝 7. 自我评价</span>
                  <span>{expandedSections.self ? '▼' : '▲'}</span>
                </div>
                {expandedSections.self && (
                  <div className="form-section-body col-span-2" style={{ display: 'block' }}>
                    <div className="form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label>个人技术优势概述</label>
                        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '13px' }} onClick={() => openAiDialog('self_evaluation', resume.self_evaluation || '')}>✨ AI 复制助手</button>
                      </div>
                      <textarea className="form-control" style={{ minHeight: '120px' }} value={resume.self_evaluation || ''} onChange={(e) => setResume(prev => ({ ...prev, self_evaluation: e.target.value }))} />
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* Preview Panel */}
        <div className="panel">
          <div className="panel-header" style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'stretch', padding: '15px 20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="tabs">
                <div className={`tab ${activeTab === 'preview' ? 'active' : ''}`} onClick={() => setActiveTab('preview')}>🌟 渲染预览</div>
                <div className={`tab ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>📝 Markdown 源码</div>
                <div className={`tab ${activeTab === 'json' ? 'active' : ''}`} onClick={() => setActiveTab('json')}>💻 JSON 结构</div>
                <div className={`tab ${activeTab === 'latex' ? 'active' : ''}`} onClick={() => setActiveTab('latex')}>📄 LaTeX 源码 (预留)</div>
              </div>
            </div>

            {/* Customizer controls bar inside Preview Panel Header */}
            {activeTab === 'preview' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: 'rgba(255, 255, 255, 0.03)', padding: '10px 15px', borderRadius: '8px', border: '1px solid var(--glass-border)', fontSize: '12px', color: 'var(--text-secondary)', alignItems: 'center' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>🎨 主题定制：</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>风格:</span>
                  <select style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px' }} value={previewTheme} onChange={(e) => setPreviewTheme(e.target.value)}>
                    <option value="classic">经典白 (Classic)</option>
                    <option value="warm">温暖杏 (Warm)</option>
                    <option value="academic">学术蓝 (Academic)</option>
                    <option value="midnight">极客黑 (Midnight)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>字号:</span>
                  <select style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px' }} value={previewFontSize} onChange={(e) => setPreviewFontSize(e.target.value)}>
                    <option value="12px">小号 (12px)</option>
                    <option value="13px">标准 (13px)</option>
                    <option value="14px">大号 (14px)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>标题样式:</span>
                  <select style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px' }} value={previewSectionStyle} onChange={(e) => setPreviewSectionStyle(e.target.value)}>
                    <option value="underline">下划线 (Underline)</option>
                    <option value="border-left">左侧竖线 (Border Left)</option>
                    <option value="minimalist">无装饰极简 (Minimalist)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>页边距:</span>
                  <select style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px' }} value={previewMargin} onChange={(e) => setPreviewMargin(e.target.value)}>
                    <option value="tight">紧凑 (Tight)</option>
                    <option value="standard">默认 (Standard)</option>
                    <option value="loose">宽松 (Loose)</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="panel-body" style={{ background: activeTab === 'preview' ? '#f3f4f6' : 'var(--bg-tertiary)' }}>
            {activeTab === 'preview' && renderResumeSheet()}
            {activeTab === 'markdown' && (
              <pre className="code-display">
                <code>{generateMarkdown(resume)}</code>
              </pre>
            )}
            {activeTab === 'json' && (
              <pre className="code-display">
                <code>{JSON.stringify(resume, null, 2)}</code>
              </pre>
            )}
            {activeTab === 'latex' && (
              <pre className="code-display">
                <code>{generateLaTeX(resume)}</code>
              </pre>
            )}
          </div>
        </div>
      </div>

      {/* Copy-based AI Polish Modal */}
      {aiActiveField && (
        <div className="modal-overlay">
          <div className="modal" style={{ width: '620px' }}>
            <div className="modal-header">
              <h3>✨ AI 简历精美化润色助手</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setAiActiveField(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                💡 我们已为您生成了符合写作规范的专属 **Prompt 提示词**。请点击一键复制，并直接粘贴到 ChatGPT、Claude 或 Gemini 等模型中。
              </p>
              
              <div className="form-group">
                <label>系统生成的 AI 优化提示词 (含草稿与格式限制)</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '220px', fontFamily: 'monospace', fontSize: '12px', background: '#f8fafc', color: '#334155' }} 
                  value={getPromptForField(aiActiveField.path, aiInput)} 
                  readOnly
                />
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1, padding: '10px' }}
                  onClick={() => {
                    const prompt = getPromptForField(aiActiveField.path, aiInput);
                    navigator.clipboard.writeText(prompt);
                    alert("提示词已成功复制到剪贴板！请去 AI 窗口粘贴并回车。");
                  }}
                >
                  📋 一键复制完整 Prompt 提示词
                </button>
              </div>

              <div className="form-group" style={{ marginTop: '20px' }}>
                <label style={{ color: 'var(--accent)', fontWeight: '600' }}>📥 粘贴大模型输出的润色结果</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '110px' }} 
                  placeholder="在这里粘贴大模型为您优化后的成果，然后点击下方的确认应用..."
                  value={aiOutput} 
                  onChange={(e) => setAiOutput(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setAiActiveField(null)}>取消</button>
              <button className="btn btn-primary" onClick={applyAiPolish} disabled={!aiOutput.trim()}>确认应用修改</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
