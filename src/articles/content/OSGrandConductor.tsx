import type { ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';
import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Deeper } from '../primitives/Deeper';
import { Recap } from '../primitives/Recap';
import { RelayNav } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { ProcessAnatomy } from '../widgets/ProcessAnatomy';
import { ContextSwitch } from '../widgets/ContextSwitch';
import { Scheduler } from '../widgets/Scheduler';
import { MMUTranslator } from '../widgets/MMUTranslator';
import { SyscallDoorway } from '../widgets/SyscallDoorway';
import { KeypressRelay } from '../widgets/KeypressRelay';

const LINK: React.CSSProperties = { color: '#00753F' };
const MONO = (s: string) => <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>{s}</span>;

export function OSGrandConductor() {
  const { bn } = useLang();

  const body: React.CSSProperties = bn
    ? { fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }
    : { fontFamily: "'Anek Latin',sans-serif" };

  const p = (s: ReactNode) => <p style={{ margin: '0 0 16px', ...body }}>{s}</p>;
  const ul = (items: ReactNode[]) => (
    <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...body }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 8 }}>{item}</li>)}
    </ul>
  );
  const box = (label: string, children: ReactNode) => (
    <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.65)', padding: '14px 18px', margin: '0 0 16px' }}>
      <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#00753F', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</div>
      <div style={{ margin: 0, fontSize: 15.5, ...body }}>{children}</div>
    </div>
  );

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={body}>
            {p('আপনার laptop-এ এই মুহূর্তে কতগুলো program চলছে?')}
            {p('সহজে যা মনে পড়ে — browser, code editor, terminal, Spotify। কিন্তু task manager খুলে দেখলে দেখা যায় ৫০-১০০টা process background-এ চলছে। System service, background sync, notification handler — সব।')}
            {p('কিন্তু laptop-এর CPU-তে কি ১০০টা core আছে? না। বেশিরভাগ laptop-এ ৪ থেকে ১৬টা core। মানে hardware-এর দিক থেকে দেখলে, একই সময়ে সর্বোচ্চ ১৬টা কাজ হতে পারে।')}
            {p('তাহলে ১০০টা program একসাথে চলে কীভাবে?')}
            {p(<>উত্তর একটাই। ওরা আসলে একসাথে চলছে না। ওরা এত দ্রুত পালা করে চলছে যে আপনার চোখে "একসাথে" মনে হচ্ছে। আর এই পুরো পালা-বদলের কাজ যে করছে, সে আপনার laptop-এর সবচেয়ে গুরুত্বপূর্ণ software — <strong>Operating System</strong>।</>)}
            {p('আজকের গল্প OS-কে ঘিরে।')}
            {box('// একটা কথা আগে বলে রাখি', <>
              <p style={{ margin: '0 0 12px', ...body }}>এই সিরিজে এতদিন সব কথা ছিল hardware নিয়ে। Transistor, gate, CPU, register, <a href="/writing/memory-hierarchy" style={LINK}>cache, RAM</a>। আজ প্রথম software-এর দুনিয়ায় পা রাখা।</p>
              <p style={{ margin: '0 0 12px', ...body }}>কিন্তু এই software সাধারণ কোনো app না। এটা এমন এক software যেটা বাকি সব software-কে চালায়। Linux, Windows, macOS, Android, iOS — এদের সবার নাম আলাদা, কিন্তু কাজ মূলত একই। Hardware আর application-এর মাঝখানে বসে সবার resource ভাগ করে দেওয়া। কে কখন CPU পাবে, কার কতটুকু memory লাগবে, কে file পড়তে পারবে — সব OS ঠিক করে দেয়।</p>
            </>)}
            <p style={{ margin: '0 0 8px', ...body }}>আজকে যেসব প্রশ্নের উত্তর খুঁজব:</p>
            {ul([
              'একটা CPU-তে ৫০টা program একসাথে চলে কীভাবে?',
              'একটা program-এর bug আরেকটাকে ক্র্যাশ করায় না কেন?',
              'আপনার লেখা app hardware-এ direct access পায় না কেন, তাহলে file/network use করে কীভাবে?',
            ])}
          </div>
        ) : (
          <div style={body}>
            {p("How many programs are running on your laptop right now?")}
            {p("The easy answer — browser, code editor, terminal, Spotify. But open task manager and you'll see 50-100 processes running in the background. System services, background sync, notification handlers — all of it.")}
            {p("But does your CPU have 100 cores? No. Most laptops have 4 to 16. So from the hardware side, only 16 things can happen at any moment.")}
            {p("So how do 100 programs run at the same time?")}
            {p(<>The answer is one thing. They don't. They take turns so fast it feels simultaneous to you. And the master orchestrator of all that turn-taking is one thing — the <strong>Operating System</strong>.</>)}
            {p("That's today's story.")}
            {box('// the first software', <>
              <p style={{ margin: '0 0 12px', ...body }}>Everything so far in this series has been about hardware. Transistors, gates, CPU, registers, <a href="/writing/memory-hierarchy" style={LINK}>cache, RAM</a>. Today we step into the world of software for the first time.</p>
              <p style={{ margin: '0 0 12px', ...body }}>But this isn't ordinary software. It's software that runs all other software. Linux, Windows, macOS, Android, iOS — the names differ, but the job is the same. Sit between the hardware and applications, hand out resources to everyone. Who gets the CPU when, how much memory each one is allowed, who's allowed to touch files — the OS decides.</p>
            </>)}
            <p style={{ margin: '0 0 8px', ...body }}>Today's questions:</p>
            {ul([
              'How do 50 programs run on one CPU at the same time?',
              "Why doesn't a bug in one program crash another?",
              "Why can't your app touch hardware directly, and how does it use files/network then?",
            ])}
          </div>
        )}
      </div>

      <Section num="01" bnH2="Program আর Process — এক জিনিস না" enH2="Program vs Process — Not the Same Thing">
        {bn ? (
          <div lang="bn" style={body}>
            {p('শুরুতেই একটা distinction পরিষ্কার করে নেওয়া দরকার। এই দুইটা শব্দ প্রায়ই মিশিয়ে ব্যবহার হয়, কিন্তু আসলে দুই জিনিস।')}
            {p(<><strong>Program</strong> হলো disk-এ পড়ে থাকা একটা {MONO('.exe')} বা {MONO('.app')} file। কোড, ডেটা — সব একটা structured file-এ গুছানো। এই মুহূর্তে সে কিছুই করছে না। শুধু বসে আছে।</>)}
            {p(<>সেই file-এ double-click করলেন। এখন সেটা "চলতে" শুরু করেছে — সেটাই <Term id="process">process</Term>।</>)}
            {p('সহজ কথায় বলতে গেলে, একটা recipe (program) আর সেই recipe দেখে রান্না করা (process) — দুই জিনিস। একই recipe দিয়ে দশজন রাঁধুনি দশটা আলাদা রান্না করতে পারেন। ঠিক তেমনি একই program থেকে অনেকগুলো process চলতে পারে। Chrome খুলে ২০টা tab খুললেন — প্রতিটার জন্য প্রায়ই একটা করে আলাদা process।')}
          </div>
        ) : (
          <div style={body}>
            {p('The distinction matters up front. These two words often get mixed up, but they mean different things.')}
            {p(<>A <strong>program</strong> is a {MONO('.exe')} or {MONO('.app')} file sitting on disk. Code and data organized into a structured file. Right now, it isn't doing anything. Just sitting there.</>)}
            {p(<>Double-click that file. Now it's starting to "run" — that's called a <Term id="process">process</Term>.</>)}
            {p("Simply put: a recipe (program) and someone actually cooking with that recipe (process) — two different things. Ten cooks can make ten different meals from the same recipe. Similarly, many processes can run from the same program. Open Chrome, open 20 tabs — often each gets its own process.")}
          </div>
        )}
      </Section>

      <Section num="02" bnH2="একটা process-এর ভেতরে কী থাকে?" enH2="What Lives Inside a Process?">
        {bn ? (
          <div lang="bn" style={body}>
            {p('OS যখন একটা process তৈরি করে, তখন সেটার জন্য একটা পুরো "workspace" প্রস্তুত করে দেয়। এই workspace-এ কয়েকটা নির্দিষ্ট অংশ থাকে:')}
            {p(<><strong>PID (Process ID):</strong> Process-এর নাম — মানে একটা unique নম্বর। যাতে OS বুঝতে পারে কোন process কার কথা বলছে।</>)}
            {p(<><strong>Memory space:</strong> নিজস্ব একটা memory এলাকা, যেখানে এই process-এর সব কিছু (কোড, ডেটা, ইত্যাদি) থাকে। এই এলাকা কীভাবে "নিজস্ব" হয় সেটা একটু পরের section-এ দেখব — এটা virtual memory-র গল্প।</>)}
            <p style={{ margin: '0 0 8px', ...body }}>সেই memory এলাকার ভেতরে আবার কয়েকটা section:</p>
            {p(<><strong>Code section:</strong> Program-এর instruction গুলো এখানে থাকে। এই অংশ read-only, যাতে program ভুল করে বা কেউ ইচ্ছা করে নিজের কোড পাল্টে ফেলতে না পারে।</>)}
            {p(<><strong>Data section:</strong> এখানে থাকে সেই সব variable যেগুলো program-এর শুরু থেকে শেষ পর্যন্ত টিকে থাকে। যেমন C-তে function-এর বাইরে declare করা {MONO('int counter = 0;')} — এই ধরনের global variable এখানে বসে থাকে। Program যতক্ষণ চলবে, ততক্ষণ এই variable-ও থাকবে।</>)}
            {p(<><strong>Stack:</strong> যখন একটা function call হয়, তার parameter আর local variable-এর জন্য সাময়িক জায়গা লাগে। Function শেষ হলে সেই জায়গা মুছে যাবে। এই সাময়িক জায়গার নাম stack।<br /><br />কল্পনা করুন একটা কাগজের tray-তে একের পর এক কাগজ রাখছেন — সবশেষ কাগজটা সবার ওপরে থাকে, সেটাই আগে সরাতে হবে। Function call-ও এভাবেই — যে function সবশেষ call হয়েছে, সে-ই আগে শেষ হয়। এই "শেষে এসে আগে যায়" pattern-এর নামই stack।</>)}
            {p(<><strong>Heap:</strong> কখনো কখনো program চলাকালীন হঠাৎ বড় একটা array বা object তৈরি করতে হয় — যেটা কতটা বড় হবে তা আগে জানা ছিল না। এই dynamic memory-র জন্য জায়গা আসে heap থেকে। JavaScript-এ যখন {MONO('new Array(1000)')} লেখেন, বা C-তে {MONO('malloc()')} করেন — memory আসে heap থেকে।</>)}
            {p(<><strong>File descriptors:</strong> Program চলাকালীন file খুলল, network connection বানাল — এসব track করতে হয়। কারণ পরে আবার সেই file-এ কিছু লিখতে হতে পারে, বা সেই connection বন্ধ করতে হতে পারে। File descriptor হলো এই connection-গুলোর "handle" — একটা ছোট নম্বর, যেটা দিয়ে program বলতে পারে "এই connection-টার সাথে কাজ করো।"</>)}
            {p(<><strong>Register state:</strong> এই process যখন CPU-তে চলছিল, তখন CPU-র register-এ যা যা ছিল — সেই সব। কেন এটা track করে রাখতে হবে? কারণ OS এই process-কে সরিয়ে অন্যটা চালাবে। কিছুক্ষণ পর যখন এই process আবার চালু হবে, তখন সে ভুলে যাবে সে কোথায় থেমেছিল, কোন value নিয়ে কাজ করছিল। তাই সরিয়ে রাখার আগে সব save করা লাগে।</>)}
            <p style={{ margin: '0 0 8px', ...body }}>Process-এর memory layout সাধারণত এভাবে সাজানো:</p>
            <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, lineHeight: 1.7, background: 'rgba(0,0,0,0.04)', border: '1px solid #c9bda0', padding: '12px 16px', overflowX: 'auto', margin: '0 0 16px' }}>{`উপরের address    ┌─────────────────────┐
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
নিচের address    └─────────────────────┘`}</pre>
            {p(<>এই সবগুলো OS একটা কেন্দ্রীয় জায়গায় track করে রাখে, যাকে বলে <Term id="pcb">PCB</Term> (Process Control Block)। OS-এর কাছে প্রতিটা process মানে PCB-তে একটা entry। নিচের যন্ত্রে process-এর memory কীভাবে সাজানো, সেটা দেখানো হয়েছে:</>)}
          </div>
        ) : (
          <div style={body}>
            {p('When the OS creates a process, it sets up a whole "workspace" for it. That workspace has a few specific parts:')}
            {p(<><strong>PID (Process ID):</strong> The process's name — really just a unique number. So the OS knows which process is being talked about.</>)}
            {p(<><strong>Memory space:</strong> A dedicated area of memory where everything (code, data, and so on) for this process lives. How this area becomes "its own" is a story for the next section — the virtual memory story.</>)}
            <p style={{ margin: '0 0 8px', ...body }}>Inside that memory area are a few sections:</p>
            {p(<><strong>Code section:</strong> The program's instructions live here. This section is read-only — so the program can't accidentally rewrite its own code, and no one else can either.</>)}
            {p(<><strong>Data section:</strong> Variables that stick around from the beginning of the program to the end. Something like {MONO('int counter = 0;')} declared outside any function in C — that global variable sits here. As long as the program runs, this variable stays.</>)}
            {p(<><strong>Stack:</strong> When a function is called, its parameters and local variables need temporary space. When the function ends, that space vanishes. That temporary space is the stack.<br /><br />Picture stacking papers into a tray, one after another — the last paper on top is the first one you take out. Function calls work the same way — the function called last is the first to finish. That "last-in, first-out" pattern is where the stack gets its name.</>)}
            {p(<><strong>Heap:</strong> Sometimes during execution the program needs to suddenly create a big array or object — something whose size wasn't known ahead of time. That dynamic memory comes from the heap. When you write {MONO('new Array(1000)')} in JavaScript, or {MONO('malloc()')} in C — memory comes from the heap.</>)}
            {p(<><strong>File descriptors:</strong> As the program runs, it opens files, creates network connections. These need to be tracked. Because the program might later want to write to that file, or close that connection. A file descriptor is the "handle" for one of these connections — a small number the program can use to say "work with this connection."</>)}
            {p(<><strong>Register state:</strong> Whatever was in the CPU's registers while this process was running — all of it. Why track it? Because the OS is going to move this process off the CPU and let another one run. When this process's turn comes again, it will have forgotten where it was, which values it was working with. So it all needs to be saved before it's moved off.</>)}
            <p style={{ margin: '0 0 8px', ...body }}>A typical process memory layout:</p>
            <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, lineHeight: 1.7, background: 'rgba(0,0,0,0.04)', border: '1px solid #c9bda0', padding: '12px 16px', overflowX: 'auto', margin: '0 0 16px' }}>{`High address    ┌─────────────────────┐
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
Low address     └─────────────────────┘`}</pre>
            {p(<>The OS tracks all of this in one central place, called a <Term id="pcb">PCB</Term> (Process Control Block). To the OS, every process is essentially one entry in a PCB table. Build up a process's memory layout on the instrument below:</>)}
          </div>
        )}
        <ProcessAnatomy />
      </Section>

      <Section num="03" bnH2="এক CPU-তে অনেকজন: পালা-বদলের গল্প" enH2="Many Processes on One CPU: The Turn-Taking Story">
        {bn ? (
          <div lang="bn" style={body}>
            {p('এবার আসল প্রশ্ন। CPU একটাই (বা কয়েকটা core)। কিন্তু process অনেকগুলো। তাহলে?')}
            {p('উত্তর: OS প্রতিটা process-কে সামান্য সময়ের জন্য CPU-তে বসিয়ে দেয় — সাধারণত ১ থেকে ১০ millisecond। সেই সময় শেষ হলে, বা process নিজে থেকে থামলে (যেমন disk থেকে ডেটা পড়ার জন্য অপেক্ষা করলে), OS তাকে সরিয়ে অন্য process-কে বসিয়ে দেয়।')}
            {p(<>এই "সরানো আর বসানো"-র নাম <Term id="contextswitch"><strong>Context Switch</strong></Term>।</>)}
            {p('কল্পনা করুন আপনি ৫টা আলাদা subject-এ homework করছেন — গণিত, বাংলা, ইংরেজি, বিজ্ঞান, সমাজ। এক সাথে সবগুলো করা সম্ভব না। তাই একটা করে করছেন। কিন্তু একটা থেকে আরেকটায় যাওয়ার আগে কয়েকটা কাজ করতে হয়:')}
            {ul([
              'এখন যে subject-এ আছেন, সেটার page number কোথায় ছিল সেটা bookmark দিয়ে রাখা।',
              'কোন চিন্তা কোথায় ছিল সেটাও রাফখাতায় টুকে রাখা।',
              'বই বন্ধ করা।',
              'পরের subject-এর বই বের করা।',
              'আগেরবার যে page-এ থেমেছিলেন সেই page-এ ফেরত যাওয়া।',
              'কোথায় কী চিন্তা ছিল সেটা মনে করা।',
            ])}
            {p('তারপরই কাজ শুরু করা যায়।')}
            {p('CPU-তেও ঠিক এমনই হয়। শুধু bookmark না — CPU-র "মাথায়" (মানে register-এ) যা যা তথ্য ছিল, কোন instruction চালাচ্ছিল, কোন value hand-এ ধরা ছিল, সব সাময়িক ডেটা — save করে রাখতে হয়। সেই save-এর জায়গা হলো process-এর PCB। এরপর নতুন process-এর PCB থেকে তার আগের সব "মাথার অবস্থা" আবার CPU-তে load করা হয়। এখন CPU সেই process-এর কাজ চালিয়ে যেতে পারবে যেখানে সে আগেরবার থেমেছিল।')}
            {p('CPU নিজে জানে না কতগুলো process আছে বা কার সাথে কাজ করছে। সে শুধু instruction execute করে যাচ্ছে যেটা যেভাবে দেওয়া হচ্ছে। OS-ই প্রতি কয়েক millisecond অন্তর তার সামনে নতুন process দাঁড় করিয়ে দিচ্ছে। নিচে এক ধাপ এক ধাপ করে switch-টা ঘটিয়ে দেখুন:')}
          </div>
        ) : (
          <div style={body}>
            {p("Now the real question. There's one CPU (or a few cores). But many processes. So?")}
            {p("The answer: the OS gives each process a tiny slice of time on the CPU — typically 1 to 10 milliseconds. When that time is up, or the process stops on its own (waiting for disk data, say), the OS moves it off and puts another process on.")}
            {p(<>That "moving off and putting on" is called a <Term id="contextswitch"><strong>context switch</strong></Term>.</>)}
            {p("Imagine you're doing homework in 5 different subjects — math, Bangla, English, science, social studies. You can't do all of them at once. So you do one at a time. But before switching from one to another, a few things have to happen:")}
            {ul([
              'Bookmark the page in the current subject.',
              'Jot down whatever you were thinking about in a scratch pad.',
              'Close the book.',
              'Open the next subject\'s book.',
              'Go to the page where you last left off.',
              'Recall what you were thinking about last time.',
            ])}
            {p('Only then does work resume.')}
            {p("CPUs work the same way. Except instead of bookmarks, everything in the CPU's \"head\" (its registers) — whatever instruction it was running, whatever values it was holding, all that transient data — has to be saved. That save location is the process's PCB. Then the next process's PCB is read, and its \"head state\" is loaded back into the CPU. Now the CPU can pick up where that process last left off.")}
            {p("The CPU itself doesn't know how many processes exist or who it's working for. It just keeps executing whatever instructions it's given. The OS is rotating new processes in front of it every few milliseconds. Step through one switch below:")}
          </div>
        )}
        <ContextSwitch />
        {bn ? (
          <div lang="bn" style={body}>{p('এই পালা-বদলের একটা দাম আছে। প্রতিবার save-load করতে সময় যায় — মানে switch যত ঘনঘন হবে, actual কাজের জন্য সময় ততই কম মিলবে। তাই OS চেষ্টা করে balance রাখতে — অনেক ঘনঘন switch না, আবার এতটা কমও না যে user টের পায় "hang" হয়ে গেছে।')}</div>
        ) : (
          <div style={body}>{p("This turn-taking has a cost. Every save-and-load takes time — the more frequent the switches, the less time is left for actual work. So the OS tries to strike a balance: not so frequent that everything slows down, but not so infrequent that users notice a \"hang\".")}</div>
        )}
      </Section>

      <Section num="04" bnH2="Scheduling: কার পালা এখন?" enH2="Scheduling: Whose Turn Is It Now?">
        {bn ? (
          <div lang="bn" style={body}>
            {p('আরেকটা প্রশ্ন। যদি একই সময়ে ১০০টা process ready অবস্থায় থাকে, OS কীভাবে ঠিক করে পরের বার কে CPU পাবে?')}
            {p(<>এই সিদ্ধান্ত নেওয়ার নাম <Term id="scheduler"><strong>scheduling</strong></Term>। কে কখন CPU পাবে, কতক্ষণ পাবে — এই সিদ্ধান্তগুলো নেয় OS-এর ভেতরের একটা algorithm, যাকে বলে <strong>scheduler</strong>।</>)}
            {p('কী মাথায় রেখে scheduler কাজ করে? মূলত তিনটা কথা — সবাই যেন fair chance পায়, জরুরি কাজ যেন আগে হয়, আর system যেন responsive থাকে। কিন্তু এই তিনটাকে একসাথে satisfy করা কঠিন। তাই বিভিন্ন সময়ে বিভিন্ন algorithm design হয়েছে:')}
            {ul([
              <><strong>Round-Robin:</strong> সবাইকে সমান সময় দাও। ক্লাসে teacher যেমন সবাইকে পালা করে বলার সুযোগ দেন — এই algorithm-ও তেমনই। সরল, fair। কিন্তু সমস্যা একটা — system-এর কিছু process (যেমন mouse cursor update বা keyboard driver) অন্যদের চেয়ে বেশি জরুরি। তাদের সমান সময় দেওয়ার মানে, cursor lag করবে।</>,
              <><strong>Priority-based:</strong> এই সমস্যার সমাধান — যাদের priority বেশি, তারা আগে চান্স পাবে। কিন্তু এখানেও risk আছে। যদি কোনো low-priority process অনেক দিন পর্যন্ত CPU-ই না পায়, সেটাকে বলে "starvation" — অনাহারে থাকা।</>,
              <>আগে Linux-এ ব্যবহার হতো <strong>CFS (Completely Fair Scheduler)</strong> — প্রতিটা process কতটা CPU time পেয়েছে সেটার হিসাব রাখত, যে কম পেয়েছে তাকে পরের চান্স দিত। ২০২৩-এ Linux kernel 6.6-এ এর জায়গা নিয়েছে <strong>EEVDF</strong>, যেটা fairness-এর পাশাপাশি latency আরও সরাসরি সামলায়।</>,
            ])}
            {p('সব algorithm-এর ভেতরের হিসাব জানার দরকার নেই। এতটুকু মনে রাখলেই চলবে — OS-এর একটা "রেফারি" আছে যে প্রতি context switch-এ ঠিক করে দেয় পরের বার CPU কার হাতে যাবে। নিচের যন্ত্রে তিনটা policy চালিয়ে দেখুন — কে বারবার CPU পায়, আর কে অনাহারে থাকে:')}
          </div>
        ) : (
          <div style={body}>
            {p('Another question. If 100 processes are all ready for the CPU, how does the OS decide who goes next?')}
            {p(<>That decision is called <Term id="scheduler"><strong>scheduling</strong></Term>. Who gets the CPU when, and for how long — those choices are made by an algorithm inside the OS called the <strong>scheduler</strong>.</>)}
            {p("What does the scheduler try to optimize for? Three things — everyone gets a fair chance, urgent work gets priority, and the system stays responsive. But these three are hard to satisfy at once. So over the years, many algorithms have been designed:")}
            {ul([
              <><strong>Round-Robin:</strong> Give everyone equal time. Like a teacher letting every student speak in turn. Simple and fair. But there's a problem — some processes (like mouse cursor updates or keyboard drivers) are more urgent than others. Giving them the same slice means the cursor lags.</>,
              <><strong>Priority-based:</strong> The fix for that — higher priority processes get chosen first. But there's a new risk. If low-priority processes never get any CPU, it's called "starvation."</>,
              <>Linux used <strong>CFS (Completely Fair Scheduler)</strong> for years — tracking CPU time per process, giving the next turn to whoever got the least. In 2023, Linux kernel 6.6 replaced it with <strong>EEVDF</strong>, which handles latency more explicitly alongside fairness.</>,
            ])}
            {p("Don't worry about the internal math of these algorithms. This much is enough — the OS has a \"referee\" that, at every context switch, decides who gets the CPU next. Run all three policies below — watch who keeps getting the CPU, and who starves:")}
          </div>
        )}
        <Scheduler />
        <Deeper
          bnLabel="আরেকটু গভীরে — preemption, priority inversion, CFS/EEVDF-এর ভেতর"
          enLabel="go deeper — preemption, priority inversion, inside CFS/EEVDF"
        >
          {bn ? (
            <ul lang="bn" style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Preemptive বনাম cooperative:</strong> আধুনিক OS preemptive — timer interrupt এসে জোর করে process থামায়। পুরোনো cooperative model-এ process নিজে থেকে ছাড়ত; একটা আটকে গেলে পুরো system জমে যেত।</li>
              <li style={{ marginBottom: 10 }}><strong>Nice value আর priority inversion:</strong> Linux-এ {MONO('nice')} দিয়ে priority নাড়ানো যায়। কিন্তু low-priority process যদি এমন lock ধরে রাখে যা high-priority-র দরকার — high আটকে যায়। এই "priority inversion" একবার Mars Pathfinder mission-কেও রিবুট লুপে ফেলেছিল।</li>
              <li><strong>CFS/EEVDF-এর ভেতর:</strong> CFS প্রতিটা task-এর "virtual runtime" রাখত একটা red-black tree-তে — সবচেয়ে কম vruntime-ওয়ালা task পরের বার চলত (O(log n))। Linux 6.6-এ এর জায়গায় আসা EEVDF deadline-ও হিসাব করে, যাতে latency-sensitive task আরও সময়মতো চলে।</li>
            </ul>
          ) : (
            <ul style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Preemptive vs cooperative:</strong> modern OSes are preemptive — a timer interrupt forcibly pauses a process. In the old cooperative model a process yielded voluntarily; one stuck process froze the whole system.</li>
              <li style={{ marginBottom: 10 }}><strong>Nice values and priority inversion:</strong> Linux lets you nudge priority with {MONO('nice')}. But if a low-priority process holds a lock a high-priority one needs, the high one stalls. This "priority inversion" once trapped the Mars Pathfinder mission in a reboot loop.</li>
              <li><strong>Inside CFS/EEVDF:</strong> CFS kept each task's "virtual runtime" in a red-black tree — lowest vruntime runs next (O(log n)). EEVDF, which replaced it in Linux 6.6, also tracks virtual deadlines so latency-sensitive tasks run on time, not just fairly.</li>
            </ul>
          )}
        </Deeper>
      </Section>

      <Section num="05" bnH2="Virtual Memory: প্রতিটা program-এর নিজস্ব একটা জগত" enH2="Virtual Memory: Every Process Gets Its Own World">
        {bn ? (
          <div lang="bn" style={body}>
            {p('Multitasking-এর আরেকটা সমস্যা — memory।')}
            {p(<>আপনার laptop-এ এখন Chrome, VS Code, Spotify — সবাই একই RAM ব্যবহার করছে। প্রতিটা program কোনো না কোনো memory address-এ কিছু লিখছে। যদি Chrome ভুল করে সেই address-এ কিছু লেখে যেখানে VS Code-এর ডেটা আছে, VS Code crash করবে। আরও খারাপ — একটা malicious app যদি ইচ্ছা করে অন্য app-এর data (যেমন password) পড়ে ফেলে?</>)}
            {p(<>তাই OS একটা কৌশল বার করেছে। <strong>প্রতিটা process-কে নিজের একটা পুরো memory এলাকা দিয়ে দাও — যেখানে সে ভাবতে পারে পুরো RAM তার একার।</strong></>)}
            {p('কীভাবে সম্ভব? মাঝখানে একটা "অনুবাদক" (translator) বসানো হয়েছে।')}
            {p(<>Program যখন কোডে লেখে "এই ডেটা memory address ১০০-তে রাখো", সে ভাবে সে actual RAM-এর ১০০ নম্বর ঘরে রাখছে। কিন্তু আসলে সেই "১০০" একটা <Term id="virtualmem">virtual address</Term> — মানে "কল্পিত" address। মাঝখানের অনুবাদক (একটা hardware unit, নাম MMU — Memory Management Unit) সেই virtual address-কে instant translate করে দেয় actual physical address-এ।</>)}
            {p('Chrome-এর জন্য "virtual address ১০০" হয়তো actual physical address 8,42,000। VS Code-এর জন্য একই "virtual address ১০০" হয়তো actual 1,15,60,000। দুই program একই virtual address ব্যবহার করছে, কিন্তু বাস্তব RAM-এ তারা সম্পূর্ণ ভিন্ন জায়গায়। কেউ কারো এলাকায় ঢুকছে না।')}
            {p(<>এই অনুবাদের rule OS নিজে তৈরি করে দেয় — প্রতিটা process-এর জন্য একটা করে "translation table", যার নাম <strong>page table</strong>। নিচে দুই process টগল করে দেখুন একই virtual address কীভাবে ভিন্ন জায়গায় যায়:</>)}
          </div>
        ) : (
          <div style={body}>
            {p('Another problem in multitasking — memory.')}
            {p("On your laptop, Chrome, VS Code, and Spotify are all sharing the same RAM. Each program is writing to some memory address. If Chrome accidentally writes to an address where VS Code has data, VS Code crashes. Worse — what if a malicious app deliberately reads another app's password?")}
            {p(<>So the OS came up with a trick. <strong>Give each process its own complete memory area — where it can believe the whole RAM belongs to it alone.</strong></>)}
            {p('How is that possible? There\'s a "translator" sitting in the middle.')}
            {p(<>When a program writes in its code "put this data at memory address 100," it thinks it's putting it at physical RAM address 100. But actually, that "100" is a <Term id="virtualmem">virtual address</Term> — an imaginary address. The middle translator (a hardware unit called the MMU — Memory Management Unit) instantly translates that virtual address to an actual physical address.</>)}
            {p('For Chrome, "virtual address 100" might be actual physical 842,000. For VS Code, the same "virtual address 100" might be actual 11,560,000. Two programs using the same virtual address, but they end up in completely different places in real RAM. Neither is touching the other\'s territory.')}
            {p(<>The rules for this translation are set up by the OS — one "translation table" per process, called a <strong>page table</strong>. Toggle between two processes below and watch the same virtual address land in different places:</>)}
          </div>
        )}
        <MMUTranslator />
        {bn ? (
          <div lang="bn" style={body}>
            <p style={{ margin: '0 0 8px', ...body }}>Virtual memory-র মাধ্যমে দুইটা বড় সুবিধা পাওয়া যায়:</p>
            {p(<><strong>Isolation:</strong> এক process আরেক process-এর memory-তে ঢুকতে পারে না। কারণ তার translation table তাকে সেই এলাকায় নিয়েই যায় না। কে কোথায় কী লিখছে, অন্যদের জানার কোনো উপায় নেই। এটাই আধুনিক system security-র foundation।</>)}
            {p(<><strong>বেশি memory-র illusion:</strong> Physical RAM 16 GB হলেও প্রতিটা program ভাবতে পারে তার অনেক বড় একটা memory আছে — RAM-এর চেয়েও বড়। কীভাবে সম্ভব? কারণ যা এই মুহূর্তে use হচ্ছে না, তা RAM-এ থাকতেই হবে এমন না। OS সেই অংশ disk-এ সরিয়ে রাখতে পারে। যখন আবার লাগবে, তখন RAM-এ ফিরিয়ে আনবে। Program জানতেও পারবে না কিছু হয়েছে। এই "সরানো-ফেরানো" ব্যবস্থাকে বলে <strong>swap</strong>। যদি চাওয়া page RAM-এ না থাকে, ঘটে একটা <Term id="pagefault">page fault</Term>।</>)}
            {p('সহজ কথায় — virtual memory হলো OS-এর দেওয়া একটা মিষ্টি মিথ্যা। প্রতিটা program ভাবছে সে একা এই কম্পিউটারের একচ্ছত্র অধিপতি। বাস্তবে ৫০ জন রাজা পাশাপাশি বসে আছে, কেউ কাউকে দেখছে না।')}
          </div>
        ) : (
          <div style={body}>
            <p style={{ margin: '0 0 8px', ...body }}>Virtual memory provides two big benefits:</p>
            {p(<><strong>Isolation:</strong> One process cannot touch another's memory. Because its translation table doesn't lead into that territory at all. Nobody has any way of seeing what anyone else is writing. This is the foundation of modern system security.</>)}
            {p(<><strong>Illusion of extra space:</strong> Physical RAM might be 16 GB, but each process can think it has a much larger memory area — bigger than the RAM. How? Because whatever isn't being used right now doesn't need to be in RAM. The OS can move it to disk. When it's needed again, the OS pulls it back to RAM. The program doesn't even notice anything happened. This "move out and pull back" system is called <strong>swap</strong>. If a requested page isn't in RAM, a <Term id="pagefault">page fault</Term> occurs.</>)}
            {p("Simply put — virtual memory is a sweet lie the OS tells. Every program thinks it's the only king of the computer. In reality, 50 kings are sitting side by side, none seeing anyone else.")}
          </div>
        )}
        <Deeper
          bnLabel="আরেকটু গভীরে — page table, TLB, swap আর thrashing"
          enLabel="go deeper — page tables, the TLB, swap and thrashing"
        >
          {bn ? (
            <ul lang="bn" style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Page আর page table:</strong> memory 4 KB-র page-এ ভাগ করা। প্রতি translation মানে টেবিল-লুকআপ। ৬৪-bit address space-এ flat table বিশাল হবে, তাই multi-level (4 স্তর) page table ব্যবহার হয়।</li>
              <li style={{ marginBottom: 10 }}><strong>TLB:</strong> প্রতিবার page table পড়া ধীর হবে, তাই সাম্প্রতিক translation-গুলো একটা ছোট hardware cache-এ রাখা থাকে — Translation Lookaside Buffer। TLB hit হলে translation প্রায় ফ্রি।</li>
              <li><strong>Swap আর thrashing:</strong> RAM ভরে গেলে OS ক্রমাগত page disk-এ পাঠায়-আনে। যদি working set RAM-এর চেয়ে বড় হয়, system প্রায় সব সময় disk-এ ব্যস্ত থাকে, actual কাজ থমকে যায় — একে বলে thrashing।</li>
            </ul>
          ) : (
            <ul style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Pages and page tables:</strong> memory is split into 4 KB pages. Every translation is a table lookup. A flat table over a 64-bit address space would be gigantic, so multi-level (4-tier) page tables are used.</li>
              <li style={{ marginBottom: 10 }}><strong>TLB:</strong> reading the page table every time would be slow, so recent translations live in a tiny hardware cache — the Translation Lookaside Buffer. A TLB hit makes translation nearly free.</li>
              <li><strong>Swap and thrashing:</strong> when RAM fills, the OS constantly shuttles pages to and from disk. If the working set exceeds RAM, the system stays busy on disk almost all the time and real work stalls — that's thrashing.</li>
            </ul>
          )}
        </Deeper>
      </Section>

      <Section num="06" bnH2="Kernel Mode আর User Mode: দুই স্তরের দরজা" enH2="Kernel Mode and User Mode: Two Levels of Doors">
        {bn ? (
          <div lang="bn" style={body}>
            {p('আরেকটা fundamental separation আছে — এবার security-র দিক থেকে।')}
            {p('Windows-এ Admin account আর regular user account-এর পার্থক্য জানেন। Admin সব করতে পারে — settings change, software install, system files edit। Regular user restricted — সে system-এর কিছু ভাঙতে পারবে না, কিন্তু নিজের কাজ করতে পারবে।')}
            {p('CPU-রও ঠিক এমন দুইটা mode আছে:')}
            {p(<><strong>Kernel Mode</strong> = admin mode। এই mode-এ থাকা code যা খুশি করতে পারে — hardware-এ direct access, অন্য process-এর memory দেখা, page table পাল্টানো, সব। শুধু OS-এর নিজের code এই mode-এ চলে।</>)}
            {p(<><strong>User Mode</strong> = restricted mode। এই mode-এ থাকা program hardware-এ direct access পায় না। কোনো sensitive operation করার চেষ্টা করলে CPU নিজে থেকেই বন্ধ করে দেয়। সব regular application এই mode-এ চলে — আপনার browser, editor, game, সবাই।</>)}
            {p('কেন এই বিভাজন? সহজ কারণ — যদি প্রতিটা app যা খুশি করতে পারত, একটা bad app পুরো system-এ ছড়িয়ে পড়তে পারত। User mode-এ থেকে app শুধু নিজের কাজটা করতে পারে, বাকি কিছুতে হাত দিতে পারে না।')}
            {p('কিন্তু app-এর তো কিছু কাজ করতেই হবে যেগুলোতে hardware লাগে — file পড়া, network-এ পাঠানো, screen-এ আঁকা। এসব তাহলে সে কীভাবে করে?')}
            {p(<>উত্তর: OS-এর কাছে অনুরোধ করে। সেই অনুরোধ পাঠানোর mechanism-এর নাম <Term id="syscall"><strong>System Call</strong></Term>।</>)}
          </div>
        ) : (
          <div style={body}>
            {p('Another fundamental separation — this time from the security angle.')}
            {p('You know the difference between an Admin account and a regular user account on Windows. Admin can do everything — change settings, install software, edit system files. Regular user is restricted — can\'t break the system, but can do their own work.')}
            {p('The CPU itself has two such modes:')}
            {p(<><strong>Kernel Mode</strong> = admin mode. Code running in this mode can do anything — direct hardware access, look at any process's memory, change page tables, everything. Only the OS's own code runs in this mode.</>)}
            {p(<><strong>User Mode</strong> = restricted mode. Programs in this mode can't touch hardware directly, can't do sensitive operations. If they try, the CPU itself shuts them down. All regular applications run in this mode — your browser, editor, games, all of them.</>)}
            {p("Why the split? Simple reason — if every app could do anything, one bad app could break the whole system. In user mode, an app can only do its own work; it can't touch anything else.")}
            {p("But apps do have to do things that need hardware — reading files, sending on the network, drawing on screen. How do they do those?")}
            {p(<>The answer: they ask the OS. The mechanism for asking is called a <Term id="syscall"><strong>System Call</strong></Term>.</>)}
          </div>
        )}
        {/* System Call sub-section */}
        {bn ? (
          <div lang="bn" style={body}>
            {p('System call হলো user-এ থাকা app আর kernel-এ থাকা OS-এর মাঝে একটা controlled দরজা। App বলে "এই কাজটা আমার হয়ে করে দাও", OS সেটা করে দেয়।')}
            {p('C-তে একটা সহজ উদাহরণ:')}
          </div>
        ) : (
          <div style={body}>
            {p('A system call is a controlled door between the app in user mode and the OS in kernel mode. The app says "please do this for me," the OS does it.')}
            {p('A simple example in C:')}
          </div>
        )}
        {/* Code block */}
        <div style={{ margin: '22px 0', background: '#1b231b', border: '1px solid #4a493a', overflow: 'hidden', boxShadow: '0 10px 28px rgba(20,18,10,0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: '#232b23', borderBottom: '1px solid #2e392e' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff6b6b', display: 'block' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#e0c264', display: 'block' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#00d26a', display: 'block' }} />
            <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11, color: '#8aa893', marginLeft: 8 }}>read_file.c</span>
          </div>
          <div style={{ display: 'flex', fontFamily: "'Departure Mono',monospace", fontSize: 12.5, lineHeight: 1.9, overflowX: 'auto' }}>
            <div aria-hidden="true" style={{ flex: 'none', textAlign: 'right', color: '#455545', padding: '12px 12px', borderRight: '1px solid #2e392e', userSelect: 'none', whiteSpace: 'pre' }}>{'1\n2\n3\n4\n5\n6\n7\n8\n9\n10'}</div>
            <div style={{ margin: 0, padding: '12px 18px', color: '#cfe8d8', whiteSpace: 'pre' }}>
              <span style={{ color: '#6c8873' }}>#include</span> <span style={{ color: '#8aa893' }}>&lt;fcntl.h&gt;</span>{'\n'}
              <span style={{ color: '#6c8873' }}>#include</span> <span style={{ color: '#8aa893' }}>&lt;unistd.h&gt;</span>{'\n\n'}
              <span style={{ color: '#7fae94' }}>int</span> <span style={{ color: '#9fd8b8' }}>main</span>() {'{'}
              {'\n'}
              {'  '}<span style={{ color: '#7fae94' }}>int</span> fd = <span style={{ color: '#00d26a', textShadow: '0 0 8px rgba(0,210,106,0.35)' }}>open</span>(<span style={{ color: '#b8d8c4' }}>"file.txt"</span>, O_RDONLY);  <span style={{ color: '#6c8873' }}>{'// system call'}</span>{'\n'}
              {'  '}<span style={{ color: '#7fae94' }}>char</span> buffer[<span style={{ color: '#d8c88a' }}>100</span>];{'\n'}
              {'  '}<span style={{ color: '#00d26a', textShadow: '0 0 8px rgba(0,210,106,0.35)' }}>read</span>(fd, buffer, <span style={{ color: '#d8c88a' }}>100</span>);                 <span style={{ color: '#6c8873' }}>{'// system call'}</span>{'\n'}
              {'  '}<span style={{ color: '#00d26a', textShadow: '0 0 8px rgba(0,210,106,0.35)' }}>close</span>(fd);                            <span style={{ color: '#6c8873' }}>{'// system call'}</span>{'\n'}
              {'  '}<span style={{ color: '#7fae94' }}>return</span> <span style={{ color: '#d8c88a' }}>0</span>;{'\n'}
              {'}'}
            </div>
          </div>
        </div>
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>এই {MONO('open()')}, {MONO('read()')}, {MONO('close()')} — দেখতে সাধারণ function call-এর মতো। কিন্তু ভেতরে এরা কিছু বিশেষ কাজ করে। এরা CPU-কে একটা special instruction execute করতে বলে (x86-64-এ যার নাম {MONO('syscall')})। সেই instruction CPU-কে বলে "user mode থেকে kernel mode-এ চলে যাও, OS-এর কাছে গিয়ে এই কাজটা করে ফিরে এসো।"</>)}
            <p style={{ margin: '0 0 8px', ...body }}>পুরো ব্যাপারটা সংক্ষেপে এমন:</p>
            <ol style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...body }}>
              <li style={{ marginBottom: 6 }}>App parameter গুলো নির্দিষ্ট জায়গায় রেখে দেয়।</li>
              <li style={{ marginBottom: 6 }}>{MONO('syscall')} instruction fire করে।</li>
              <li style={{ marginBottom: 6 }}>CPU নিজে থেকেই kernel mode-এ চলে যায়।</li>
              <li style={{ marginBottom: 6 }}>OS-এর pre-defined handler কাজটা সম্পন্ন করে।</li>
              <li style={{ marginBottom: 6 }}>Result নিয়ে CPU আবার user mode-এ ফিরে আসে।</li>
              <li style={{ marginBottom: 6 }}>App result পেয়ে যায়।</li>
            </ol>
            <p style={{ margin: '0 0 8px', ...body }}>সব ধরনের কাজের জন্যই এই ধরনের system call আছে:</p>
            {ul([
              <><strong>File operation:</strong> {MONO('open()')}, {MONO('read()')}, {MONO('write()')}, {MONO('close()')}</>,
              <><strong>Network:</strong> {MONO('socket()')}, {MONO('send()')}, {MONO('recv()')}</>,
              <><strong>Process:</strong> {MONO('fork()')} (নতুন process বানানো), {MONO('exit()')} (শেষ করা)</>,
              <><strong>Memory:</strong> {MONO('mmap()')} (নতুন memory চাওয়া)</>,
            ])}
            {p('এই transition একটু costly। প্রতিটা system call এ CPU cycle লাগে। তাই performance-এর দিকে খেয়াল রাখা code যতটা সম্ভব কম system call করে। নিচের যন্ত্রে দরজাটা এক ধাপ এক ধাপে পার হয়ে দেখুন:')}
          </div>
        ) : (
          <div style={body}>
            {p(<>These {MONO('open()')}, {MONO('read()')}, {MONO('close()')} calls look like ordinary function calls. But internally they do something special. They tell the CPU to execute a special instruction (on x86-64, called {MONO('syscall')}). That instruction tells the CPU "switch from user mode to kernel mode, go to the OS's handler, do this thing, and come back."</>)}
            <p style={{ margin: '0 0 8px', ...body }}>The full sequence, in short:</p>
            <ol style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...body }}>
              <li style={{ marginBottom: 6 }}>The app puts parameters in specific places.</li>
              <li style={{ marginBottom: 6 }}>It fires the {MONO('syscall')} instruction.</li>
              <li style={{ marginBottom: 6 }}>The CPU switches itself into kernel mode.</li>
              <li style={{ marginBottom: 6 }}>The OS's pre-registered handler does the work.</li>
              <li style={{ marginBottom: 6 }}>The result is placed back, and the CPU returns to user mode.</li>
              <li style={{ marginBottom: 6 }}>The app gets its result.</li>
            </ol>
            <p style={{ margin: '0 0 8px', ...body }}>Every kind of work has this kind of system call:</p>
            {ul([
              <><strong>File operations:</strong> {MONO('open()')}, {MONO('read()')}, {MONO('write()')}, {MONO('close()')}</>,
              <><strong>Network:</strong> {MONO('socket()')}, {MONO('send()')}, {MONO('recv()')}</>,
              <><strong>Process:</strong> {MONO('fork()')} (spawn a new process), {MONO('exit()')} (end)</>,
              <><strong>Memory:</strong> {MONO('mmap()')} (ask for new memory)</>,
            ])}
            {p('That transition is a little costly. Every system call burns some CPU cycles. So performance-conscious code makes as few system calls as possible. Step through the doorway on the instrument below:')}
          </div>
        )}
        <SyscallDoorway />
      </Section>

      <Section num="07" bnH2="Thread: এক Process-এর ভেতরে অনেক worker" enH2="Thread: Many Workers Inside One Process">
        {bn ? (
          <div lang="bn" style={body}>
            {p('এতক্ষণ process-এর কথা বললাম। কিন্তু Chrome-এ ২০টা tab মানে ২০টা full process বানালে খুব expensive হয়ে যাবে। প্রতিটা process-এর জন্য আলাদা memory setup, আলাদা page table — অনেক overhead।')}
            {p(<>কখনো কখনো এক process-এর ভেতরেই অনেকগুলো কাজ একসাথে করতে হয়, কিন্তু আলাদা memory দরকার হয় না — কারণ সবার data share করা লাগবে। এখানে আসে <Term id="thread"><strong>Thread</strong></Term>।</>)}
            {p('Process যদি একটা কারখানা হয়, thread হলো সেই কারখানার শ্রমিক। এক কারখানায় অনেক শ্রমিক একসাথে কাজ করতে পারে, একই মেশিন share করে, একই কাঁচামাল share করে। কিন্তু প্রতিটার নিজের একটা কাজের ধারা আছে।')}
            {p('Thread-ও তাই। এক process-এর ভেতরে multiple thread একই memory, একই file connection share করে। কিন্তু প্রতিটার নিজস্ব stack, নিজস্ব register state। একসাথে চললেও কোনোটি অন্য একটিতে ঝামেলা সৃষ্টি করে না — যতক্ষণ না কেউ কারো memory পাল্টে দেয়।')}
          </div>
        ) : (
          <div style={body}>
            {p("We've been talking about processes. But if opening 20 Chrome tabs meant 20 full processes, it would get very expensive. Each process needs its own memory setup, its own page table — lots of overhead.")}
            {p(<>Sometimes many things need to happen in parallel inside the same process, but sharing memory is fine — in fact, sharing is the point. Here's where <Term id="thread"><strong>threads</strong></Term> come in.</>)}
            {p("If a process is a factory, a thread is one of the factory's workers. A factory can have many workers running at once, all sharing the same machines and the same raw materials. Each one has its own task flow, but they share resources.")}
            {p("Threads work the same way. Inside one process, multiple threads share the same memory and the same file descriptors. But each thread has its own stack and its own register state. They run together, but they don't interfere — unless one of them changes shared memory.")}
          </div>
        )}
        {/* Thread vs Process table */}
        <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.65)', margin: '0 0 20px', overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: "'Departure Mono',monospace", fontSize: 12, color: '#33301F', minWidth: 420 }}>
            <thead>
              <tr>
                {[bn ? 'দিক' : 'ASPECT', 'PROCESS', 'THREAD'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid #26241C', fontWeight: 400, color: '#5c5442', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(bn
                ? [['Memory', 'নিজস্ব', 'share করে'], ['তৈরি করার cost', 'বেশি', 'কম'], ['একে অপরের সাথে যোগাযোগ', 'কঠিন', 'সহজ (memory share করে)'], ['একজন crash করলে', 'অন্যরা বেঁচে থাকে', 'পুরো process crash']]
                : [['Memory', 'own', 'shared'], ['Creation cost', 'high', 'low'], ['Communication', 'hard', 'easy (shared memory)'], ['Crash impact', 'others survive', 'whole process crashes']]
              ).map(([aspect, proc, thr]) => (
                <tr key={aspect as string}>
                  <td style={{ padding: '8px 14px', borderBottom: '1px solid #c9bda0' }}>{aspect}</td>
                  <td style={{ padding: '8px 14px', borderBottom: '1px solid #c9bda0', color: '#00753F' }}>{proc}</td>
                  <td style={{ padding: '8px 14px', borderBottom: '1px solid #c9bda0' }}>{thr}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bn ? (
          <div lang="bn" style={body}>{p('Web browser typical-ভাবে একটা tab-এ multiple thread ব্যবহার করে — একটা UI-র জন্য, একটা JavaScript-এর জন্য, একটা network-এর জন্য। সব একই process-এ চলছে, একই memory share করছে, কিন্তু কেউ কাউকে block করছে না।')}</div>
        ) : (
          <div style={body}>{p('A web browser typically uses multiple threads in a single tab — one for UI, one for JavaScript, one for network. All in the same process, all sharing memory, but none blocking another.')}</div>
        )}
      </Section>

      <Section num="08" bnH2="পুরো ছবিটা একবার: Keyboard-এর 'A' Screen-এ যাওয়ার গল্প" enH2="The Whole Picture: The Story of 'A' from Keyboard to Screen">
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>এবার সব একসাথে। ধরুন আপনি keyboard-এ {'\''}A{'\''}  চাপলেন। কী কী ঘটে? নিচে step চেপে পুরো relay-টা দেখুন:</>)}
          </div>
        ) : (
          <div style={body}>
            {p(<>Let's pull everything together. You press {'\''}A{'\''}  on your keyboard. What happens? Step through the whole relay below:</>)}
          </div>
        )}
        <KeypressRelay />
        {bn ? (
          <div lang="bn" style={body}>
            {p('শুধু একটা keypress-এর জন্য কয়েক ডজন step, কয়েকটা context switch, কয়েকটা system call, একটা interrupt। এবং সবার মাঝখানে OS conducting করছে — বলছে কে কখন কী করবে।')}
            {p('এই কারণেই OS-কে "Grand Conductor" বলা হয়। Hardware আর application-এর মাঝখানে বসে সব-কিছুর orchestra চালাচ্ছে, প্রতি nanosecond এ।')}
          </div>
        ) : (
          <div style={body}>
            {p('For just one keypress: dozens of steps, several context switches, several system calls, one interrupt. And in the middle of it all, the OS conducting — deciding who does what and when.')}
            {p('That\'s why the OS is called the "Grand Conductor." Between the hardware and the applications, orchestrating the whole show — every nanosecond.')}
          </div>
        )}
        <Recap>
          {bn ? (
            <>
              <li><strong>Program disk-এ পড়ে থাকে, process RAM-এ চলে।</strong> একই program থেকে অনেক process তৈরি হতে পারে।</li>
              <li><strong>CPU একটা, process অনেক — OS পালা করে চালায়।</strong> এত দ্রুত switch করে যে "একসাথে" মনে হয়।</li>
              <li><strong>Virtual memory প্রতিটা program-কে নিজের একটা জগত দেয়।</strong> যাতে কেউ কারো এলাকায় ঢুকতে না পারে।</li>
              <li><strong>Kernel/user mode security-র foundation।</strong> Regular app hardware-এ direct access পায় না।</li>
              <li><strong>System call-ই সেই দরজা</strong> — যেখান দিয়ে app OS-এর কাছে কাজ চেয়ে নেয়।</li>
              <li><strong>Thread হলো process-এর ভেতরে concurrency।</strong> এক workspace, একাধিক worker।</li>
            </>
          ) : (
            <>
              <li><strong>Program lives on disk, process runs in RAM.</strong> Many processes can be born from the same program.</li>
              <li><strong>One CPU, many processes — the OS takes turns.</strong> It switches so fast that "at once" feels real.</li>
              <li><strong>Virtual memory gives each program its own world.</strong> No one can step into anyone else's territory.</li>
              <li><strong>Kernel/user mode is the foundation of security.</strong> Regular apps can't touch hardware directly.</li>
              <li><strong>System calls are the doorway</strong> — where an app asks the OS to do work on its behalf.</li>
              <li><strong>Threads are concurrency inside a process.</strong> One workspace, many workers.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={{ label: { bn: 'সিরিজ hub', en: 'series hub' }, title: 'The Machine Beneath Your Code', href: '/writing/tech-articles', variant: 'hub' }}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৭ — কোড থেকে মেশিন কোড' : '07 — Code to Machine Code', href: '#', variant: 'next' }}
        bridge={{
          bn: 'Hardware দেখা হলো। OS দেখা হলো। কিন্তু আপনি যে code লেখেন — JavaScript, Python, Go — সেটা তো CPU-এর নিজস্ব ভাষা না। CPU শুধু machine code বোঝে, সেই hex numbers। মাঝখানে তাহলে কী ঘটে? আপনার লেখা text file কীভাবে CPU-র জন্য executable instruction হয়ে যায়? Compiler, interpreter, JIT — এদের গল্পটা পরের আর্টিকেলে।',
          en: "Hardware — done. OS — done. But the code you write — JavaScript, Python, Go — isn't the CPU's own language. The CPU only understands machine code, those hex numbers. So what's happening in between? How does the text file you write become executable CPU instructions? Compiler, interpreter, JIT — those stories are next.",
        }}
      />
      <Colophon />
    </article>
  );
}
