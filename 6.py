from tkinter import *
#import sqlite3
from tkinter import ttk
from tkinter import messagebox
import os
import subprocess

root = Tk()
root.geometry('500x500')
root.title("D4D - Docker For Developers")

#var1= IntVar()
#var2= IntVar()

imageNameVar =  StringVar()
tagName = StringVar()
portExpose = IntVar()
version = StringVar()
sshIP = StringVar()
dirName = StringVar()
workDir = StringVar()

def dockerTask():

   tagName1 = tagName.get()
   portExpose1 = portExpose.get()
   version1 = version.get()
   sshIP1 = sshIP.get()
   imageName1 = imageNameVar.get()
   workDir1 = workDir.get()
   dirName1 = dirName.get()

   #print(f'TAGNAME: {tagName1}')
   #print(f'PORTEXPOSE: {portExpose1}')
   #print(f'VERSION: {version1}')
   #print(f'IMAGENAME: {imageName1}')

   #RUN yarn install
   #RUN yarn run build

   #EXPOSE 3000
   #CMD ["yarn","start"]

   file1 = open("D4DDockerfile","w")

   L = ["ARG imageName\n","FROM $imageName \n","ARG portExpose \n","ARG dirName \n","ARG workDir \n","RUN mkdir -p ${dirName} \n","WORKDIR ${workDir} \n","#COPY package.json /usr/src/ \n","COPY . ${workDir} \n","RUN yarn install \n","RUN yarn run build \n","EXPOSE $portExpose \n","CMD [\"yarn\", \"start\"] \n"]

   file1.writelines(L)
   file1.close()

   os.environ['IMAGENAME'] = imageName1
   os.environ['VERSION'] = version1
   os.environ['PORTEXPOSE'] = str(portExpose1)
   os.environ['TAGNAME'] = tagName1
   os.environ['DIRNAME'] = dirName1
   os.environ['WORKDIR'] = workDir1
   var1 = imageName1
   var2 = version1
   var3 = portExpose1
   var4 = tagName1
   var5 = dirName1
   var6 = workDir1
   os.putenv('IMAGENAME', var1)
   os.putenv('VERSION', var2)
   os.putenv('PORTEXPOSE', str(var3))
   os.putenv('TAGNAME', var4)
   os.putenv('DIRNAME', var5)
   os.putenv('WORKDIR', var6)

   #cmd2 = 'env'
   #proc = subprocess.Popen(cmd2, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
   #o2, e2 = proc.communicate()

   #print('Output2: ' + o2.decode('ascii'))
   #print('Error2: ' + e2.decode('ascii'))


   cmd = 'docker build --force-rm -f D4DDockerfile -t $TAGNAME --build-arg imageName=$IMAGENAME --build-arg dirName=$DIRNAME --build-arg workDir=$WORKDIR --build-arg portExpose=$PORTEXPOSE .'
   os.system(cmd)
   os.system("docker images")

   os.system("rm D4DDockerfile")

   cmd = 'docker run -v ./:$WORKDIR -p 8080:$PORTEXPOSE $TAGNAME'
   os.system(cmd)

   print("================================================================================================")

   messagebox.showinfo(title='Comment info', message='hit the url http://localhost:$PORTEXPOSE')

   #conn = sqlite3.connect('Form.db')

   #with conn:
    #  cursor=conn.cursor()
   #cursor.execute('CREATE TABLE IF NOT EXISTS Student (Fullname TEXT,Email TEXT,Gender TEXT,country TEXT,Programming TEXT)')
   #cursor.execute('INSERT INTO Student (FullName,Email,Gender,country,Programming) VALUES(?,?,?,?,?)',(name1,email,gender,country,prog,))
   #conn.commit()


label_0 = Label(root, text="Docker Image Creation",width=20,font=("bold", 20))
label_0.place(x=90,y=53)

label_1 = Label(root, text="portExpose",width=20,font=("bold", 10))
label_1.place(x=80,y=130)

entry_1 = Entry(root,textvar=portExpose)
entry_1.place(x=240,y=130)

label_2 = Label(root, text="version",width=20,font=("bold", 10))
label_2.place(x=68,y=180)

entry_2 = Entry(root,textvar=version)
entry_2.place(x=240,y=180)

label_5 = Label(root, text="tagName",width=20,font=("bold", 10))
label_5.place(x=70,y=230)

entry_5 = Entry(root,textvar=tagName)
entry_5.place(x=240,y=230)

label_4 = Label(root, text="imageName",width=20,font=("bold", 10))
label_4.place(x=70,y=280)

list1 = ['nginx','apache','node','httpd','redis','ubuntu'];

droplist=OptionMenu(root,imageNameVar, *list1)
droplist.config(width=25)
imageNameVar.set('select your docker image')
droplist.place(x=240,y=280)

label_6 = Label(root, text="work directory",width=20,font=("bold", 10))
label_6.place(x=75,y=340)

entry_6 = Entry(root,textvar=workDir)
entry_6.place(x=240,y=340)

label_7 = Label(root, text="directory name",width=20,font=("bold", 10))
label_7.place(x=75,y=370)

entry_7 = Entry(root,textvar=dirName)
entry_7.place(x=240,y=370)

#Checkbutton(root, text="java", variable=var1).place(x=235,y=330)

#Checkbutton(root, text="python", variable=var2).place(x=290,y=330)

Button(root, text='Submit',width=20,bg='brown',fg='white',command=dockerTask).place(x=180,y=430)

root.mainloop()
