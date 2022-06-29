import os, re
import json

info_handle = open('info.txt', 'r')
info = info_handle.read().split('\n')

id_place = dict()

for place in info[1:]:
    id, name = place.split(':')
    id_place[id] = name

result = ""
day_names = {}
for day in info[0].split(','):
    key, value = day.split(':')
    day_names[key] = value

materials = {}
departments = {}
sections = {}
lectures = {True: [], False: []}
result += 'let data = ['
index = 0
data = []
for day in os.listdir('data'):
    for place_id in os.listdir('data/' + day):
        place = id_place[place_id]
        subjects = open('data/' + day + '/' + place_id, 'r').read().split('\n\n')
        for sub in subjects:
            material, who, instructors, time = sub.split('\n')
            section = 0
            department = who
            if re.search('[0-9]', who):
                section = who[-1]
                department = who[:-1]

            dayName = day_names[day]
            # print(material.strip())
            if material.strip() not in materials:
                materials[material.strip()] = []
            materials[material.strip()].append(index)
            
            if section not in sections.keys():
                sections[section] = []
            sections[section].append(index)
            
            lectures[section == 0].append(index)

            if department.strip() not in departments:
                departments[department.strip()] = []
            departments[department.strip()].append(index)

            material = material.strip()
            instructors = instructors.strip()
            result += (f'{{time: {time}, section: "{section}", department: "{department}", subject: "{material}", day: "{dayName}", place: "{place}", instructor: "{instructors}"}},\n')
            data.append({'time': time, 'section': section, 'department': department, 'subject': material, 'day': dayName, 'place': place, 'instructor': instructors})
            # if index >= 140 or index == 0:
            # print(f'{{time: {time}, section: "{section}", department: "{department}", subject: "{material}", day: "{dayName}", place: "{place}", instructor: "{instructors}"}}')
            # except Exception as e:
            #     print(e, sub)
            # finally:
            index += 1

result += (']\nexport default data;')
newDepts = {'CS': [], 'SC': [], 'CSYS':[], 'IS': []}
for key in departments.keys():
    if '+' in key:
        keys = key.split('+')
        newDepts[keys[0]].extend(departments[key])
        newDepts[keys[1]].extend(departments[key])
    else:
        newDepts[key].extend(departments[key])

# print(json.dumps(sections))
f = open('src/data.js', 'w')
# f.write("export const data = ")
# f.write(json.dumps(data))
# f.write('\n\n')

def writeData(**kw):
    for key, value in kw.items():
        f.write(f"export const {key} = ")
        f.write(json.dumps(value))
        f.write('\n\n')

f.write("""\
export const DATA_LENGTH = 146;
export const ALL_INDICES = Array.from(Array(DATA_LENGTH).keys());

""")
lectures[False] = []
print(sections.keys())
del sections[0]
print(sections.keys())
writeData(data=data, departments=newDepts, courses=materials, sections=sections, lectures=lectures)

f.write("export const ALL_SECTIONS = Object.values(sections).flat();\n")

f.write("""\
export const filterables = {
    'subject': courses,
    'section': sections,
    'department': departments,
    'lecture': lectures,
}
""")


f.close()
