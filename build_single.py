"""Bundles the module project into one self-contained HTML (for previews / single-file hosting)."""
import re,base64,io,glob,os,json
from PIL import Image
R=os.path.dirname(os.path.abspath(__file__))
def rd(p): return open(os.path.join(R,p),encoding="utf8").read()
IMG={}
for f in glob.glob(R+"/assets/img/**/*.*",recursive=True):
    if f.endswith(".ico"): continue
    im=Image.open(f).convert("RGB"); im.thumbnail((1000 if "Certificate" in f or "Activity" in f else 1400,)*2)
    b=io.BytesIO(); im.save(b,"JPEG",quality=70,optimize=True)
    IMG[os.path.relpath(f,R).replace(os.sep,"/")]="data:image/jpeg;base64,"+base64.b64encode(b.getvalue()).decode()
order=["data/content","core/Component","models/Project","services/GitHubService","components/Navbar","components/ProjectGallery","components/Section","components/RevealObserver","components/Effects","core/App"]
js=""
for m in order:
    t=rd(f"assets/js/{m}.js")
    t=re.sub(r"^import .*$","",t,flags=re.M); t=re.sub(r"^export ","",t,flags=re.M)
    js+=t+"\n"
js=js.replace("const A = n => `assets/img/Activity/activity-${n}.jpg`;","const A = n => IMG[`assets/img/Activity/activity-${n}.jpg`];")
js=js.replace("const C = (n, ext = \"jpg\") => `assets/img/Certificate/Certificate-${n}.${ext}`;","const C = (n, ext = \"jpg\") => IMG[`assets/img/Certificate/Certificate-${n}.${ext}`];")
js="const IMG="+json.dumps(IMG)+";\n"+js+"\nnew App().start();"
html=rd("index.html")
html=html.replace('<link rel="stylesheet" href="assets/css/style.css">',"<style>\n"+rd("assets/css/style.css")+"\n</style>")
html=re.sub(r'<script type="module".*?</script>',lambda m:"<script>\n"+js.replace("</script>","<\\/script>")+"\n</script>",html,flags=re.S)
for k,v in IMG.items(): html=html.replace(f'src="{k}"',f'src="{v}"')
os.makedirs(R+"/dist",exist_ok=True)
open(R+"/dist/portfolio.html","w",encoding="utf8").write(html)
print(len(html)//1024,"KB")
