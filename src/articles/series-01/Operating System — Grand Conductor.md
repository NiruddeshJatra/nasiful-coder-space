# Operating System — Grand Conductor

## ৫০টা program একসাথে চলে কীভাবে?

আপনার laptop-এ এই মুহূর্তে কতগুলো program চলছে?

সহজে যা মনে পড়ে — browser, code editor, terminal, Spotify। কিন্তু task manager খুলে দেখলে দেখা যায় ৫০-১০০টা process background-এ চলছে। System service, background sync, notification handler — সব।

কিন্তু laptop-এর CPU-তে কি ১০০টা core আছে? না। বেশিরভাগ laptop-এ ৪ থেকে ১৬টা core। মানে hardware-এর দিক থেকে দেখলে, একই সময়ে সর্বোচ্চ ১৬টা কাজ হতে পারে।

তাহলে ১০০টা program একসাথে চলে কীভাবে?

উত্তর একটাই। ওরা আসলে একসাথে চলছে না। ওরা এত দ্রুত পালা করে চলছে যে আপনার চোখে "একসাথে" মনে হচ্ছে। আর এই পুরো পালা-বদলের কাজ যে করছে, সে আপনার laptop-এর সবচেয়ে গুরুত্বপূর্ণ software — **Operating System**।

আজকের গল্প OS-কে ঘিরে।

---

// একটা কথা আগে বলে রাখি

এই সিরিজে এতদিন সব কথা ছিল hardware নিয়ে। Transistor, gate, CPU, register, cache, RAM। আজ প্রথম software-এর দুনিয়ায় পা রাখা।

কিন্তু এই software সাধারণ কোনো app না। এটা এমন এক software যেটা বাকি সব software-কে চালায়। Linux, Windows, macOS, Android, iOS — এদের সবার নাম আলাদা, কিন্তু কাজ মূলত একই। Hardware আর application-এর মাঝখানে বসে সবার resource ভাগ করে দেওয়া। কে কখন CPU পাবে, কার কতটুকু memory লাগবে, কে file পড়তে পারবে — সব OS ঠিক করে দেয়।

আজকে যেসব প্রশ্নের উত্তর খুঁজব:

- একটা CPU-তে ৫০টা program একসাথে চলে কীভাবে?
- একটা program-এর bug আরেকটাকে ক্র্যাশ করায় না কেন?
- আপনার লেখা app hardware-এ direct access পায় না কেন, তাহলে file/network use করে কীভাবে?

---

// Program আর Process — দুটো এক জিনিস না

শুরুতেই একটা distinction পরিষ্কার করে নেওয়া দরকার। এই দুইটা শব্দ প্রায়ই মিশিয়ে ব্যবহার হয়, কিন্তু আসলে দুই জিনিস।

Program হলো disk-এ পড়ে থাকা একটা .exe বা .app file। কোড, ডেটা — সব একটা structured file-এ গুছানো। এই মুহূর্তে সে কিছুই করছে না। শুধু বসে আছে।

সেই file-এ double-click করলেন। এখন সেটা "চলতে" শুরু করেছে — সেটাই process।

সহজ কথায় বলতে গেলে, একটা recipe (program) আর সেই recipe দেখে রান্না করা (process) — দুই জিনিস। একই recipe দিয়ে দশজন রাঁধুনি দশটা আলাদা রান্না করতে পারেন। ঠিক তেমনি একই program থেকে অনেকগুলো process চলতে পারে। Chrome খুলে ২০টা tab খুললেন — প্রতিটার জন্য প্রায়ই একটা করে আলাদা process।

---

// একটা Process-এর ভেতরে কী থাকে?

OS যখন একটা process তৈরি করে, তখন সেটার জন্য একটা পুরো "workspace" প্রস্তুত করে দেয়। এই workspace-এ কয়েকটা নির্দিষ্ট অংশ থাকে:

**PID (Process ID):** Process-এর নাম — মানে একটা unique নম্বর। যাতে OS বুঝতে পারে কোন process কার কথা বলছে।

**Memory space:** নিজস্ব একটা memory এলাকা, যেখানে এই process-এর সব কিছু (কোড, ডেটা, ইত্যাদি) থাকে। এই এলাকা কীভাবে "নিজস্ব" হয় সেটা একটু পরের section-এ দেখব — এটা virtual memory-র গল্প।

সেই memory এলাকার ভেতরে আবার কয়েকটা section:

**Code section:** Program-এর instruction গুলো এখানে থাকে। এই অংশ read-only, যাতে program ভুল করে বা কেউ ইচ্ছা করে নিজের কোড পাল্টে ফেলতে না পারে।

**Data section:** এখানে থাকে সেই সব variable যেগুলো program-এর শুরু থেকে শেষ পর্যন্ত টিকে থাকে। যেমন C-তে function-এর বাইরে declare করা `int counter = 0;` — এই ধরনের global variable এখানে বসে থাকে। Program যতক্ষণ চলবে, ততক্ষণ এই variable-ও থাকবে।

**Stack:** যখন একটা function call হয়, তার parameter আর local variable-এর জন্য সাময়িক জায়গা লাগে। Function শেষ হলে সেই জায়গা মুছে যাবে। এই সাময়িক জায়গার নাম stack।

কল্পনা করুন একটা কাগজের tray-তে একের পর এক কাগজ রাখছেন — সবশেষ কাগজটা সবার ওপরে থাকে, সেটাই আগে সরাতে হবে। Function call-ও এভাবেই — যে function সবশেষ call হয়েছে, সে-ই আগে শেষ হয়। এই "শেষে এসে আগে যায়" pattern-এর নামই stack।

**Heap:** কখনো কখনো program চলাকালীন হঠাৎ বড় একটা array বা object তৈরি করতে হয় — যেটা কতটা বড় হবে তা আগে জানা ছিল না। এই dynamic memory-র জন্য জায়গা আসে heap থেকে। JavaScript-এ যখন `new Array(1000)` লেখেন, বা C-তে `malloc()` করেন — memory আসে heap থেকে।

**File descriptors:** Program চলাকালীন file খুলল, network connection বানাল — এসব track করতে হয়। কারণ পরে আবার সেই file-এ কিছু লিখতে হতে পারে, বা সেই connection বন্ধ করতে হতে পারে। File descriptor হলো এই connection-গুলোর "handle" — একটা ছোট নম্বর, যেটা দিয়ে program বলতে পারে "এই connection-টার সাথে কাজ করো।"

**Register state:** এই process যখন CPU-তে চলছিল, তখন CPU-র register-এ যা যা ছিল — সেই সব। কেন এটা track করে রাখতে হবে? কারণ OS এই process-কে সরিয়ে অন্যটা চালাবে। কিছুক্ষণ পর যখন এই process আবার চালু হবে, তখন সে ভুলে যাবে সে কোথায় থেমেছিল, কোন value নিয়ে কাজ করছিল। তাই সরিয়ে রাখার আগে সব save করা লাগে।

Process-এর memory layout সাধারণত এভাবে সাজানো:

```
উপরের address    ┌─────────────────────┐
                 │       Stack         │  ← function call-এর সাথে বাড়ে-কমে
                 │         ↓           │      নিচের দিকে বাড়ে
                 │                     │
                 │      (unused)       │
                 │                     │
                 │         ↑           │
                 │        Heap         │  ← malloc/new-এ বাড়ে
                 ├─────────────────────┤       উপরের দিকে বাড়ে
                 │    Data / BSS       │  ← global variables
                 ├─────────────────────┤
                 │       Code          │  ← program-এর instruction
নিচের address    └─────────────────────┘
```

*ANIMATION HINT: একটা process-এর memory layout দেখানো। প্রথমে code section-এ instruction ঢুকছে (static)। তারপর data section-এ global variable বসছে। এরপর program run শুরু — heap-এ malloc হচ্ছে, নিচ থেকে উপরে দিকে জায়গা বড় হচ্ছে; একই সাথে stack-এ function call হচ্ছে, উপর থেকে নিচের দিকে একটার পর একটা বাক্স যুক্ত হচ্ছে, function শেষ হলে সেই বাক্স মুছে যাচ্ছে। মাঝে unused space, যেখান দিয়ে দুই দিক এগোচ্ছে।*

এই সবগুলো OS একটা কেন্দ্রীয় জায়গায় track করে রাখে, যাকে বলে PCB (Process Control Block)। OS-এর কাছে প্রতিটা process মানে PCB-তে একটা entry।

---

// এক CPU-তে অনেকজন: পালা-বদলের গল্প

এবার আসল প্রশ্ন। CPU একটাই (বা কয়েকটা core)। কিন্তু process অনেকগুলো। তাহলে?

উত্তর: OS প্রতিটা process-কে সামান্য সময়ের জন্য CPU-তে বসিয়ে দেয় — সাধারণত ১ থেকে ১০ millisecond। সেই সময় শেষ হলে, বা process নিজে থেকে থামলে (যেমন disk থেকে ডেটা পড়ার জন্য অপেক্ষা করলে), OS তাকে সরিয়ে অন্য process-কে বসিয়ে দেয়।

এই "সরানো আর বসানো"-র নাম **Context Switch**।

কল্পনা করুন আপনি ৫টা আলাদা subject-এ homework করছেন — গণিত, বাংলা, ইংরেজি, বিজ্ঞান, সমাজ। এক সাথে সবগুলো করা সম্ভব না। তাই একটা করে করছেন। কিন্তু একটা থেকে আরেকটায় যাওয়ার আগে কয়েকটা কাজ করতে হয়:

- এখন যে subject-এ আছেন, সেটার page number কোথায় ছিল সেটা bookmark দিয়ে রাখা।
- কোন চিন্তা কোথায় ছিল সেটাও রাফখাতায় টুকে রাখা।
- বই বন্ধ করা।
- পরের subject-এর বই বের করা।
- আগেরবার যে page-এ থেমেছিলেন সেই page-এ ফেরত যাওয়া।
- কোথায় কী চিন্তা ছিল সেটা মনে করা।

তারপরই কাজ শুরু করা যায়।

CPU-তেও ঠিক এমনই হয়। শুধু bookmark না — CPU-র "মাথায়" (মানে register-এ) যা যা তথ্য ছিল, কোন instruction চালাচ্ছিল, কোন value hand-এ ধরা ছিল, সব সাময়িক ডেটা — save করে রাখতে হয়। সেই save-এর জায়গা হলো process-এর PCB। এরপর নতুন process-এর PCB থেকে তার আগের সব "মাথার অবস্থা" আবার CPU-তে load করা হয়। এখন CPU সেই process-এর কাজ চালিয়ে যেতে পারবে যেখানে সে আগেরবার থেমেছিল।

CPU নিজে জানে না কতগুলো process আছে বা কার সাথে কাজ করছে। সে শুধু instruction execute করে যাচ্ছে যেটা যেভাবে দেওয়া হচ্ছে। OS-ই প্রতি কয়েক millisecond অন্তর তার সামনে নতুন process দাঁড় করিয়ে দিচ্ছে।

এই পালা-বদলের একটা দাম আছে। প্রতিবার save-load করতে সময় যায় — মানে switch যত ঘনঘন হবে, actual কাজের জন্য সময় ততই কম মিলবে। তাই OS চেষ্টা করে balance রাখতে — অনেক ঘনঘন switch না, আবার এতটা কমও না যে user টের পায় "hang" হয়ে গেছে।

---

// Scheduling: কার পালা এখন?

আরেকটা প্রশ্ন। যদি একই সময়ে ১০০টা process ready অবস্থায় থাকে, OS কীভাবে ঠিক করে পরের বার কে CPU পাবে?

এই সিদ্ধান্ত নেওয়ার নাম **scheduling**। কে কখন CPU পাবে, কতক্ষণ পাবে — এই সিদ্ধান্তগুলো নেয় OS-এর ভেতরের একটা algorithm, যাকে বলে **scheduler**।

কী মাথায় রেখে scheduler কাজ করে? মূলত তিনটা কথা — সবাই যেন fair chance পায়, জরুরি কাজ যেন আগে হয়, আর system যেন responsive থাকে। কিন্তু এই তিনটাকে একসাথে satisfy করা কঠিন। তাই বিভিন্ন সময়ে বিভিন্ন algorithm design হয়েছে:

**Round-Robin:** সবাইকে সমান সময় দাও। ক্লাসে teacher যেমন সবাইকে পালা করে বলার সুযোগ দেন — এই algorithm-ও তেমনই। সরল, fair। কিন্তু সমস্যা একটা — system-এর কিছু process (যেমন mouse cursor update বা keyboard driver) অন্যদের চেয়ে বেশি জরুরি। তাদের সমান সময় দেওয়ার মানে, cursor lag করবে।

**Priority-based:** এই সমস্যার সমাধান — যাদের priority বেশি, তারা আগে চান্স পাবে। কিন্তু এখানেও risk আছে। যদি কোনো low-priority process অনেক দিন পর্যন্ত CPU-ই না পায়, সেটাকে বলে "starvation" — অনাহারে থাকা।

**Modern Linux-এ ব্যবহার হয় CFS (Completely Fair Scheduler)** — নাম-ই বলে দিচ্ছে লক্ষ্য কী। প্রতিটা process কতটা CPU time পেয়েছে সেটার হিসাব রাখে। যে কম পেয়েছে, তাকে পরের চান্স দেয়। এভাবেই fairness আর responsiveness — দুটোরই ব্যবস্থা হয়।

সব algorithm-এর ভেতরের হিসাব জানার দরকার নেই। এতটুকু মনে রাখলেই চলবে — OS-এর একটা "রেফারি" আছে যে প্রতি context switch-এ ঠিক করে দেয় পরের বার CPU কার হাতে যাবে।

---

// Virtual Memory: প্রতিটা program-এর নিজস্ব একটা জগত

Multitasking-এর আরেকটা সমস্যা — memory।

আপনার laptop-এ এখন Chrome, VS Code, Spotify — সবাই একই RAM ব্যবহার করছে। প্রতিটা program কোনো না কোনো memory address-এ কিছু লিখছে। যদি Chrome ভুল করে সেই address-এ কিছু লেখে যেখানে VS Code-এর ডেটা আছে, VS Code crash করবে। আরও খারাপ — একটা malicious app যদি ইচ্ছা করে অন্য app-এর data (যেমন password) পড়ে ফেলে?

তাই OS একটা কৌশল বার করেছে। **প্রতিটা process-কে নিজের একটা পুরো memory এলাকা দিয়ে দাও — যেখানে সে ভাবতে পারে পুরো RAM তার একার।**

কীভাবে সম্ভব? মাঝখানে একটা "অনুবাদক" (translator) বসানো হয়েছে।

Program যখন কোডে লেখে "এই ডেটা memory address ১০০-তে রাখো", সে ভাবে সে actual RAM-এর ১০০ নম্বর ঘরে রাখছে। কিন্তু আসলে সেই "১০০" একটা virtual address — মানে "কল্পিত" address। মাঝখানের অনুবাদক (একটা hardware unit, নাম MMU — Memory Management Unit) সেই virtual address-কে instant translate করে দেয় actual physical address-এ।

Chrome-এর জন্য "virtual address ১০০" হয়তো actual physical address 8,42,000। VS Code-এর জন্য একই "virtual address ১০০" হয়তো actual 1,15,60,000। দুই program একই virtual address ব্যবহার করছে, কিন্তু বাস্তব RAM-এ তারা সম্পূর্ণ ভিন্ন জায়গায়। কেউ কারো এলাকায় ঢুকছে না।

এই অনুবাদের rule OS নিজে তৈরি করে দেয় — প্রতিটা process-এর জন্য একটা করে "translation table", যার নাম **page table**।

*ANIMATION HINT: দুই process পাশাপাশি দেখানো। প্রতিটা থেকে একটা তীর "virtual address 100" বলে বাইরে বের হচ্ছে। মাঝখানে MMU বসে আছে — একজন "অনুবাদক"। MMU সেই তীরটা পাল্টে দিয়ে দুই ভিন্ন physical address-এ পাঠাচ্ছে। বোঝা যায়: একই virtual address, ভিন্ন actual location।*

Virtual memory-র মাধ্যমে দুইটা বড় সুবিধা পাওয়া যায়:

**Isolation:** এক process আরেক process-এর memory-তে ঢুকতে পারে না। কারণ তার translation table তাকে সেই এলাকায় নিয়েই যায় না। কে কোথায় কী লিখছে, অন্যদের জানার কোনো উপায় নেই। এটাই আধুনিক system security-র foundation।

**বেশি memory-র illusion:** Physical RAM 16 GB হলেও প্রতিটা program ভাবতে পারে তার অনেক বড় একটা memory আছে — RAM-এর চেয়েও বড়। কীভাবে সম্ভব? কারণ যা এই মুহূর্তে use হচ্ছে না, তা RAM-এ থাকতেই হবে এমন না। OS সেই অংশ disk-এ সরিয়ে রাখতে পারে। যখন আবার লাগবে, তখন RAM-এ ফিরিয়ে আনবে। Program জানতেও পারবে না কিছু হয়েছে। এই "সরানো-ফেরানো" ব্যবস্থাকে বলে **swap**।

সহজ কথায় — virtual memory হলো OS-এর দেওয়া একটা মিষ্টি মিথ্যা। প্রতিটা program ভাবছে সে একা এই কম্পিউটারের একচ্ছত্র অধিপতি। বাস্তবে ৫০ জন রাজা পাশাপাশি বসে আছে, কেউ কাউকে দেখছে না।

---

// Kernel Mode আর User Mode: দুই স্তরের দরজা

আরেকটা fundamental separation আছে — এবার security-র দিক থেকে।

Windows-এ Admin account আর regular user account-এর পার্থক্য জানেন। Admin সব করতে পারে — settings change, software install, system files edit। Regular user restricted — সে system-এর কিছু ভাঙতে পারবে না, কিন্তু নিজের কাজ করতে পারবে।

CPU-রও ঠিক এমন দুইটা mode আছে:

**Kernel Mode** = admin mode। এই mode-এ থাকা code যা খুশি করতে পারে — hardware-এ direct access, অন্য process-এর memory দেখা, page table পাল্টানো, সব। শুধু OS-এর নিজের code এই mode-এ চলে।

**User Mode** = restricted mode। এই mode-এ থাকা program hardware-এ direct access পায় না। কোনো sensitive operation করার চেষ্টা করলে CPU নিজে থেকেই বন্ধ করে দেয়। সব regular application এই mode-এ চলে — আপনার browser, editor, game, সবাই।

কেন এই বিভাজন? সহজ কারণ — যদি প্রতিটা app যা খুশি করতে পারত, একটা bad app পুরো system-এ ছড়িয়ে পড়তে পারত। User mode-এ থেকে app শুধু নিজের কাজটা করতে পারে, বাকি কিছুতে হাত দিতে পারে না।

কিন্তু app-এর তো কিছু কাজ করতেই হবে যেগুলোতে hardware লাগে — file পড়া, network-এ পাঠানো, screen-এ আঁকা। এসব তাহলে সে কীভাবে করে?

উত্তর: OS-এর কাছে অনুরোধ করে। সেই অনুরোধ পাঠানোর mechanism-এর নাম **System Call**।

---

## System Call: OS-এর কাছে অনুরোধের দরজা

System call হলো user-এ থাকা app আর kernel-এ থাকা OS-এর মাঝে একটা controlled দরজা। App বলে "এই কাজটা আমার হয়ে করে দাও", OS সেটা করে দেয়।

C-তে একটা সহজ উদাহরণ:

```c
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd = open("file.txt", O_RDONLY);  // system call
    char buffer[100];
    read(fd, buffer, 100);                 // system call
    close(fd);                             // system call
    return 0;
}
```

এই `open()`, `read()`, `close()` — দেখতে সাধারণ function call-এর মতো। কিন্তু ভেতরে এরা কিছু বিশেষ কাজ করে। এরা CPU-কে একটা special instruction execute করতে বলে (x86-64-এ যার নাম `syscall`)। সেই instruction CPU-কে বলে "user mode থেকে kernel mode-এ চলে যাও, OS-এর কাছে গিয়ে এই কাজটা করে ফিরে এসো।"

পুরো ব্যাপারটা সংক্ষেপে এমন:

1. App parameter গুলো নির্দিষ্ট জায়গায় রেখে দেয়।
2. `syscall` instruction fire করে।
3. CPU নিজে থেকেই kernel mode-এ চলে যায়।
4. OS-এর pre-defined handler কাজটা সম্পন্ন করে।
5. Result নিয়ে CPU আবার user mode-এ ফিরে আসে।
6. App result পেয়ে যায়।

সব ধরনের কাজের জন্যই এই ধরনের system call আছে:

- **File operation:** `open()`, `read()`, `write()`, `close()`
- **Network:** `socket()`, `send()`, `recv()`
- **Process:** `fork()` (নতুন process বানানো), `exit()` (শেষ করা)
- **Memory:** `mmap()` (নতুন memory চাওয়া)

এই transition একটু costly। প্রতিটা system call এ CPU cycle লাগে। তাই performance-এর দিকে খেয়াল রাখা code যতটা সম্ভব কম system call করে।

---

## Thread: এক Process-এর ভেতরে অনেক worker

এতক্ষণ process-এর কথা বললাম। কিন্তু Chrome-এ ২০টা tab মানে ২০টা full process বানালে খুব expensive হয়ে যাবে। প্রতিটা process-এর জন্য আলাদা memory setup, আলাদা page table — অনেক overhead।

কখনো কখনো এক process-এর ভেতরেই অনেকগুলো কাজ একসাথে করতে হয়, কিন্তু আলাদা memory দরকার হয় না — কারণ সবার data share করা লাগবে। এখানে আসে **Thread**।

Process যদি একটা কারখানা হয়, thread হলো সেই কারখানার শ্রমিক। এক কারখানায় অনেক শ্রমিক একসাথে কাজ করতে পারে, একই মেশিন share করে, একই কাঁচামাল share করে। কিন্তু প্রতিটার নিজের একটা কাজের ধারা আছে।

Thread-ও তাই। এক process-এর ভেতরে multiple thread একই memory, একই file connection share করে। কিন্তু প্রতিটার নিজস্ব stack, নিজস্ব register state। একসাথে চললেও কোনোটি অন্য একটিতে ঝামেলা সৃষ্টি করে না — যতক্ষণ না কেউ কারো memory পাল্টে দেয়।

Process আর Thread-এর মূল পার্থক্য:

| দিক | Process | Thread |
| --- | --- | --- |
| Memory | নিজস্ব | share করে |
| তৈরি করার cost | বেশি | কম |
| একে অপরের সাথে যোগাযোগ | কঠিন | সহজ (memory share করে) |
| একজন crash করলে | অন্যরা বেঁচে থাকে | পুরো process crash |

Web browser typical-ভাবে একটা tab-এ multiple thread ব্যবহার করে — একটা UI-র জন্য, একটা JavaScript-এর জন্য, একটা network-এর জন্য। সব একই process-এ চলছে, একই memory share করছে, কিন্তু কেউ কাউকে block করছে না।

---

// পুরো ছবিটা একবার: Keyboard-এর 'A' Screen-এ যাওয়ার গল্প

এবার সব একসাথে। ধরুন আপনি keyboard-এ 'A' চাপলেন। কী কী ঘটে?

1. **Hardware interrupt:** Keyboard controller CPU-কে একটা signal পাঠায় — "একটা key press হয়েছে!"
2. **CPU থামে:** CPU যা করছিল (হয়তো Chrome-এর কোনো instruction), সেটা থামিয়ে interrupt handler-এ চলে যায়।
3. **Kernel mode:** Handler kernel mode-এ চলে যায়, OS-এর keyboard driver activate হয়।
4. **Event তৈরি:** Driver keyboard থেকে ডেটা পড়ে বুঝতে পারে 'A' চাপা হয়েছে।
5. **কোন app এই event পাবে?:** OS দেখে এই মুহূর্তে কোন window active আছে (আপনার text editor)। সেই process-এর event queue-তে event রাখা হয়।
6. **Scheduler-এর decision:** Scheduler ঠিক করে এখনই এই process-কে CPU দেওয়া হবে কি না।
7. **Context switch:** যদি হ্যাঁ হয়, তাহলে currently running process থেকে সরে text editor process-এ যায়।
8. **App-এ ফেরত:** Text editor সচল হয়, তার pending `read()` return করে, 'A' পায়।
9. **Screen-এ আঁকা:** Text editor আরেকটা system call করে "এই character screen-এ দেখাও"। OS-এর graphics stack activate হয়।
10. **GPU-তে:** GPU driver framebuffer update করে।
11. **আপনি screen-এ 'A' দেখেন।**

শুধু একটা keypress-এর জন্য কয়েক ডজন step, কয়েকটা context switch, কয়েকটা system call, একটা interrupt। এবং সবার মাঝখানে OS conducting করছে — বলছে কে কখন কী করবে।

এই কারণেই OS-কে "Grand Conductor" বলা হয়। Hardware আর application-এর মাঝখানে বসে সব-কিছুর orchestra চালাচ্ছে, প্রতি nanosecond এ।

---

// এই আর্টিকেলে কী শিখলাম

- **Program disk-এ পড়ে থাকে, process RAM-এ চলে।** একই program থেকে অনেক process তৈরি হতে পারে।
- **CPU একটা, process অনেক — OS পালা করে চালায়।** এত দ্রুত switch করে যে "একসাথে" মনে হয়।
- **Virtual memory প্রতিটা program-কে নিজের একটা জগত দেয়।** যাতে কেউ কারো এলাকায় ঢুকতে না পারে।
- **Kernel/user mode security-র foundation।** Regular app hardware-এ direct access পায় না।
- **System call-ই সেই দরজা** — যেখান দিয়ে app OS-এর কাছে কাজ চেয়ে নেয়।
- **Thread হলো process-এর ভেতরে concurrency।** এক workspace, একাধিক worker।

---

// পরের article-এ

Hardware দেখা হলো। OS দেখা হলো।

কিন্তু আপনি যে code লেখেন — JavaScript, Python, Go — সেটা তো CPU-এর নিজস্ব ভাষা না। CPU শুধু machine code বোঝে, সেই hex numbers।

মাঝখানে তাহলে কী ঘটে? আপনার লেখা text file কীভাবে CPU-র জন্য executable instruction হয়ে যায়?

Compiler, interpreter, JIT — এদের গল্পটা পরের আর্টিকেলে।

**[পরের article: ৭. কোড থেকে মেশিন কোড]**

---

# Operating System — The Grand Conductor

## How do 50 programs run at once?

How many programs are running on your laptop right now?

The easy answer — browser, code editor, terminal, Spotify. But open task manager and you'll see 50-100 processes running in the background. System services, background sync, notification handlers — all of it.

But does your CPU have 100 cores? No. Most laptops have 4 to 16. So from the hardware side, only 16 things can happen at any moment.

So how do 100 programs run at the same time?

The answer is one thing. They don't. They take turns so fast it feels simultaneous to you. And the master orchestrator of all that turn-taking is one thing — the **Operating System**.

That's today's story.

---

## One thing to clear up first

Everything so far in this series has been about hardware. Transistors, gates, CPU, registers, cache, RAM. Today we step into the world of software for the first time.

But this isn't ordinary software. It's software that runs all other software. Linux, Windows, macOS, Android, iOS — the names differ, but the job is the same. Sit between the hardware and applications, hand out resources to everyone. Who gets the CPU when, how much memory each one is allowed, who's allowed to touch files — the OS decides.

Today's questions:

- How do 50 programs run on one CPU at the same time?
- Why doesn't a bug in one program crash another?
- Why can't your app touch hardware directly, and how does it use files/network then?

---

## Program vs Process — Not the Same Thing

The distinction matters up front. These two words often get mixed up, but they mean different things.

A program is a `.exe` or `.app` file sitting on disk. Code and data organized into a structured file. Right now, it isn't doing anything. Just sitting there.

Double-click that file. Now it's starting to "run" — that's called a process.

Simply put: a recipe (program) and someone actually cooking with that recipe (process) — two different things. Ten cooks can make ten different meals from the same recipe. Similarly, many processes can run from the same program. Open Chrome, open 20 tabs — often each gets its own process.

---

## What Lives Inside a Process?

When the OS creates a process, it sets up a whole "workspace" for it. That workspace has a few specific parts:

**PID (Process ID):** The process's name — really just a unique number. So the OS knows which process is being talked about.

**Memory space:** A dedicated area of memory where everything (code, data, and so on) for this process lives. How this area becomes "its own" is a story for the next section — the virtual memory story.

Inside that memory area are a few sections:

**Code section:** The program's instructions live here. This section is read-only — so the program can't accidentally rewrite its own code, and no one else can either.

**Data section:** Variables that stick around from the beginning of the program to the end. Something like `int counter = 0;` declared outside any function in C — that global variable sits here. As long as the program runs, this variable stays.

**Stack:** When a function is called, its parameters and local variables need temporary space. When the function ends, that space vanishes. That temporary space is the stack.

Picture stacking papers into a tray, one after another — the last paper on top is the first one you take out. Function calls work the same way — the function called last is the first to finish. That "last-in, first-out" pattern is where the stack gets its name.

**Heap:** Sometimes during execution the program needs to suddenly create a big array or object — something whose size wasn't known ahead of time. That dynamic memory comes from the heap. When you write `new Array(1000)` in JavaScript, or `malloc()` in C — memory comes from the heap.

**File descriptors:** As the program runs, it opens files, creates network connections. These need to be tracked. Because the program might later want to write to that file, or close that connection. A file descriptor is the "handle" for one of these connections — a small number the program can use to say "work with this connection."

**Register state:** Whatever was in the CPU's registers while this process was running — all of it. Why track it? Because the OS is going to move this process off the CPU and let another one run. When this process's turn comes again, it will have forgotten where it was, which values it was working with. So it all needs to be saved before it's moved off.

A typical process memory layout:

```
High address    ┌─────────────────────┐
                │       Stack         │  ← grows and shrinks with function calls
                │         ↓           │      grows downward
                │                     │
                │      (unused)       │
                │                     │
                │         ↑           │
                │        Heap         │  ← grows with malloc/new
                ├─────────────────────┤      grows upward
                │    Data / BSS       │  ← global variables
                ├─────────────────────┤
                │       Code          │  ← program's instructions
Low address     └─────────────────────┘
```

*ANIMATION HINT: A process's memory layout being built up. First code section fills in (static). Then data section, with global variables settling in. Then the program starts running — heap grows upward with malloc calls; stack grows downward with function calls adding one box after another, boxes disappearing when functions return. Between them, unused space that both sides move into.*

The OS tracks all of this in one central place, called a PCB (Process Control Block). To the OS, every process is essentially one entry in a PCB table.

---

## Many Processes on One CPU: The Turn-Taking Story

Now the real question. There's one CPU (or a few cores). But many processes. So?

The answer: the OS gives each process a tiny slice of time on the CPU — typically 1 to 10 milliseconds. When that time is up, or the process stops on its own (waiting for disk data, say), the OS moves it off and puts another process on.

That "moving off and putting on" is called a **context switch**.

Imagine you're doing homework in 5 different subjects — math, Bangla, English, science, social studies. You can't do all of them at once. So you do one at a time. But before switching from one to another, a few things have to happen:

- Bookmark the page in the current subject.
- Jot down whatever you were thinking about in a scratch pad.
- Close the book.
- Open the next subject's book.
- Go to the page where you last left off.
- Recall what you were thinking about last time.

Only then does work resume.

CPUs work the same way. Except instead of bookmarks, everything in the CPU's "head" (its registers) — whatever instruction it was running, whatever values it was holding, all that transient data — has to be saved. That save location is the process's PCB. Then the next process's PCB is read, and its "head state" is loaded back into the CPU. Now the CPU can pick up where that process last left off.

The CPU itself doesn't know how many processes exist or who it's working for. It just keeps executing whatever instructions it's given. The OS is rotating new processes in front of it every few milliseconds.

This turn-taking has a cost. Every save-and-load takes time — the more frequent the switches, the less time is left for actual work. So the OS tries to strike a balance: not so frequent that everything slows down, but not so infrequent that users notice a "hang."

---

## Scheduling: Whose Turn Is It Now?

Another question. If 100 processes are all ready for the CPU, how does the OS decide who goes next?

That decision is called **scheduling**. Who gets the CPU when, and for how long — those choices are made by an algorithm inside the OS called the **scheduler**.

What does the scheduler try to optimize for? Three things — everyone gets a fair chance, urgent work gets priority, and the system stays responsive. But these three are hard to satisfy at once. So over the years, many algorithms have been designed:

**Round-Robin:** Give everyone equal time. Like a teacher letting every student speak in turn. Simple and fair. But there's a problem — some processes (like mouse cursor updates or keyboard drivers) are more urgent than others. Giving them the same slice means the cursor lags.

**Priority-based:** The fix for that — higher priority processes get chosen first. But there's a new risk. If low-priority processes never get any CPU, it's called "starvation."

**Modern Linux uses CFS (Completely Fair Scheduler)** — the name says the goal. It tracks how much CPU time each process has gotten. Whoever got the least, gets the next turn. That way, fairness and responsiveness both work out.

Don't worry about the internal math of these algorithms. This much is enough — the OS has a "referee" that, at every context switch, decides who gets the CPU next.

---

## Virtual Memory: Every Process Gets Its Own World

Another problem in multitasking — memory.

On your laptop, Chrome, VS Code, and Spotify are all sharing the same RAM. Each program is writing to some memory address. If Chrome accidentally writes to an address where VS Code has data, VS Code crashes. Worse — what if a malicious app deliberately reads another app's password?

So the OS came up with a trick. **Give each process its own complete memory area — where it can believe the whole RAM belongs to it alone.**

How is that possible? There's a "translator" sitting in the middle.

When a program writes in its code "put this data at memory address 100," it thinks it's putting it at physical RAM address 100. But actually, that "100" is a virtual address — an imaginary address. The middle translator (a hardware unit called the MMU — Memory Management Unit) instantly translates that virtual address to an actual physical address.

For Chrome, "virtual address 100" might be actual physical 842,000. For VS Code, the same "virtual address 100" might be actual 11,560,000. Two programs using the same virtual address, but they end up in completely different places in real RAM. Neither is touching the other's territory.

The rules for this translation are set up by the OS — one "translation table" per process, called a **page table**.

*ANIMATION HINT: Two processes side by side. Each sending out an arrow that says "virtual address 100." In the middle, an MMU — a translator. The MMU redirects those arrows to two different physical addresses. The point: same virtual address, different actual locations.*

Virtual memory provides two big benefits:

**Isolation:** One process cannot touch another's memory. Because its translation table doesn't lead into that territory at all. Nobody has any way of seeing what anyone else is writing. This is the foundation of modern system security.

**Illusion of extra space:** Physical RAM might be 16 GB, but each process can think it has a much larger memory area — bigger than the RAM. How? Because whatever isn't being used right now doesn't need to be in RAM. The OS can move it to disk. When it's needed again, the OS pulls it back to RAM. The program doesn't even notice anything happened. This "move out and pull back" system is called **swap**.

Simply put — virtual memory is a sweet lie the OS tells. Every program thinks it's the only king of the computer. In reality, 50 kings are sitting side by side, none seeing anyone else.

---

## Kernel Mode and User Mode: Two Levels of Doors

Another fundamental separation — this time from the security angle.

You know the difference between an Admin account and a regular user account on Windows. Admin can do everything — change settings, install software, edit system files. Regular user is restricted — can't break the system, but can do their own work.

The CPU itself has two such modes:

**Kernel Mode** = admin mode. Code running in this mode can do anything — direct hardware access, look at any process's memory, change page tables, everything. Only the OS's own code runs in this mode.

**User Mode** = restricted mode. Programs in this mode can't touch hardware directly, can't do sensitive operations. If they try, the CPU itself shuts them down. All regular applications run in this mode — your browser, editor, games, all of them.

Why the split? Simple reason — if every app could do anything, one bad app could break the whole system. In user mode, an app can only do its own work; it can't touch anything else.

But apps do have to do things that need hardware — reading files, sending on the network, drawing on screen. How do they do those?

The answer: they ask the OS. The mechanism for asking is called a **System Call**.

---

## System Call: The Doorway to Ask the OS

A system call is a controlled door between the app in user mode and the OS in kernel mode. The app says "please do this for me," the OS does it.

A simple example in C:

```c
#include <fcntl.h>
#include <unistd.h>

int main() {
    int fd = open("file.txt", O_RDONLY);  // system call
    char buffer[100];
    read(fd, buffer, 100);                 // system call
    close(fd);                             // system call
    return 0;
}
```

These `open()`, `read()`, `close()` calls look like ordinary function calls. But internally they do something special. They tell the CPU to execute a special instruction (on x86-64, called `syscall`). That instruction tells the CPU "switch from user mode to kernel mode, go to the OS's handler, do this thing, and come back."

The full sequence, in short:

1. The app puts parameters in specific places.
2. It fires the `syscall` instruction.
3. The CPU switches itself into kernel mode.
4. The OS's pre-registered handler does the work.
5. The result is placed back, and the CPU returns to user mode.
6. The app gets its result.

Every kind of work has this kind of system call:

- **File operations:** `open()`, `read()`, `write()`, `close()`
- **Network:** `socket()`, `send()`, `recv()`
- **Process:** `fork()` (spawn a new process), `exit()` (end)
- **Memory:** `mmap()` (ask for new memory)

That transition is a little costly. Every system call burns some CPU cycles. So performance-conscious code makes as few system calls as possible.

---

## Thread: Many Workers Inside One Process

We've been talking about processes. But if opening 20 Chrome tabs meant 20 full processes, it would get very expensive. Each process needs its own memory setup, its own page table — lots of overhead.

Sometimes many things need to happen in parallel inside the same process, but sharing memory is fine — in fact, sharing is the point. Here's where **threads** come in.

If a process is a factory, a thread is one of the factory's workers. A factory can have many workers running at once, all sharing the same machines and the same raw materials. Each one has its own task flow, but they share resources.

Threads work the same way. Inside one process, multiple threads share the same memory and the same file descriptors. But each thread has its own stack and its own register state. They run together, but they don't interfere — unless one of them changes shared memory.

The main differences:

| Aspect | Process | Thread |
| --- | --- | --- |
| Memory | Own | Shared |
| Creation cost | High | Low |
| Communication | Hard | Easy (shared memory) |
| Crash impact | Others survive | Whole process crashes |

A web browser typically uses multiple threads in a single tab — one for UI, one for JavaScript, one for network. All in the same process, all sharing memory, but none blocking another.

---

## The Whole Picture: The Story of 'A' from Keyboard to Screen

Let's pull everything together. You press 'A' on your keyboard. What happens?

1. **Hardware interrupt:** The keyboard controller sends a signal to the CPU — "a key was pressed!"
2. **CPU pauses:** The CPU stops whatever it was doing (some Chrome instruction, maybe) and jumps to the interrupt handler.
3. **Kernel mode:** The handler enters kernel mode, activating the OS's keyboard driver.
4. **Event creation:** The driver reads the data from the keyboard and figures out that 'A' was pressed.
5. **Which app gets this event?** The OS finds which window is currently active (your text editor). The event is dropped into that process's event queue.
6. **Scheduler's decision:** The scheduler decides whether to hand the CPU to this process right now.
7. **Context switch:** If yes — off the current process, on to the text editor.
8. **Back to the app:** The text editor wakes up, its pending `read()` returns, delivering 'A'.
9. **Drawing on screen:** The text editor makes another system call: "please draw this character on the screen." The OS's graphics stack activates.
10. **GPU:** The GPU driver updates the framebuffer.
11. **You see 'A' on screen.**

For just one keypress: dozens of steps, several context switches, several system calls, one interrupt. And in the middle of it all, the OS conducting — deciding who does what and when.

That's why the OS is called the "Grand Conductor." Between the hardware and the applications, orchestrating the whole show — every nanosecond.

---

## What This Article Covered

- **Program lives on disk, process runs in RAM.** Many processes can be born from the same program.
- **One CPU, many processes — the OS takes turns.** It switches so fast that "at once" feels real.
- **Virtual memory gives each program its own world.** No one can step into anyone else's territory.
- **Kernel/user mode is the foundation of security.** Regular apps can't touch hardware directly.
- **System calls are the doorway** — where an app asks the OS to do work on its behalf.
- **Threads are concurrency inside a process.** One workspace, many workers.

---

## Next article

Hardware — done. OS — done.

But the code you write — JavaScript, Python, Go — isn't the CPU's own language. The CPU only understands machine code, those hex numbers.

So what's happening in between? How does the text file you write become executable CPU instructions?

Compiler, interpreter, JIT — those stories are next.

**[Next: 7. From Code to Machine Code]**

