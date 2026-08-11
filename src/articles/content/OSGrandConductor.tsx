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
      <p style={{ margin: 0, fontSize: 15.5, ...body }}>{children}</p>
    </div>
  );

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={body}>
            {p('আপনার laptop-এ এই মুহূর্তে কতগুলো program চলছে? সহজ যা মনে পড়ে — browser, code editor, terminal, Spotify। কিন্তু task manager খুলে দেখলে ৫০–১০০টা process background-এ চলছে। System service, background sync, notification handler — সব।')}
            {p('কিন্তু laptop-এর CPU-তে কি ১০০টা core আছে? না। বেশিরভাগ laptop-এ ৪ থেকে ১৬টা। মানে hardware-এর দিক থেকে একই সময়ে সর্বোচ্চ ১৬টা কাজ হতে পারে। তাহলে ১০০টা program একসাথে চলে কীভাবে?')}
            {p('উত্তর একটাই। ওরা আসলে একসাথে চলছে না। ওরা এত দ্রুত পালা করে চলছে যে আপনার চোখে "একসাথে" মনে হচ্ছে। আর এই পুরো পালা-বদলের মহাব্যবস্থাপকও একটাই — Operating System।')}
            {box('// প্রথম software', <>এই সিরিজে এতদিন সব কথা ছিল hardware নিয়ে — transistor, gate, CPU, register, <a href="/writing/memory-hierarchy" style={LINK}>cache, RAM</a>। আজ প্রথমবার software-এর দুনিয়ায় পা রাখা। কিন্তু এই software সাধারণ কোনো software না — এটা এমন এক software যেটা বাকি সব software-কে চালায়। Linux, Windows, macOS, Android, iOS — নাম আলাদা, কিন্তু কাজ একই। hardware আর application-এর মাঝখানে বসে সবাইকে resource ভাগ করে দেওয়া। কে কখন CPU পাবে, কে কতটুকু memory পাবে, কে file নিয়ে কাজ করতে পারবে — সব OS ঠিক করে দেয়।</>)}
            <p style={{ margin: '0 0 8px', ...body }}>আজকে যেসব প্রশ্নের উত্তর খুঁজব:</p>
            {ul([
              'একটা CPU-তে ৫০টা program একসাথে চলে কীভাবে?',
              'একটা program-এর bug আরেকটাকে ক্র্যাশ করায় না কেন?',
              'আপনার লেখা app hardware-এ direct access পায় না, তাহলে file/network use করে কীভাবে?',
            ])}
          </div>
        ) : (
          <div style={body}>
            {p("How many programs are running on your laptop right now? The easy answer — browser, code editor, terminal, Spotify. But open the task manager and you'll see 50–100 processes running in the background. System services, background sync, notification handlers — all of it.")}
            {p("But does your CPU have 100 cores? No. Most laptops have 4 to 16. So from the hardware side, only 16 things can happen at any instant. Then how do 100 programs run at the same time?")}
            {p('The answer is one thing. They don\'t. They take turns so fast it feels simultaneous to you. And the master orchestrator of all that turn-taking is one thing — the Operating System. That\'s today\'s story.')}
            {box('// the first software', <>Everything so far in this series has been about hardware. Transistors, gates, CPU, registers, <a href="/writing/memory-hierarchy" style={LINK}>cache, RAM</a>. Today we step into the world of software for the first time. But this isn't ordinary software. It's software that runs all other software. Linux, Windows, macOS, Android, iOS — the names differ, but the job is the same. Sit between the hardware and applications, hand out resources to everyone. Who gets the CPU when, how much memory each one is allowed, who's allowed to touch files — the OS decides.</>)}
            <p style={{ margin: '0 0 8px', ...body }}>Today's questions:</p>
            {ul([
              'How do 50 programs run on one CPU at the same time?',
              "Why doesn't a bug in one program crash another?",
              "Your app can't touch hardware directly — so how does it use files and the network?",
            ])}
          </div>
        )}
      </div>

      <Section num="01" bnH2="Program আর Process — এক জিনিস না" enH2="Program vs process — not the same thing">
        {bn ? (
          <div lang="bn" style={body}>
            {p('শুরুতেই একটা পার্থক্য পরিষ্কার করা দরকার। এই দুই শব্দ প্রায়ই মিশিয়ে ব্যবহার হয়, কিন্তু আসলে দুই জিনিস।')}
            {p(<><strong>Program</strong> হলো disk-এ পড়ে থাকা একটা {MONO('.exe')} বা {MONO('.app')} file। কোড, ডেটা — সব একটা structured file-এ গোছানো। এই মুহূর্তে সে কিছুই করছে না, শুধু বসে আছে।</>)}
            {p(<>সেই file-এ double-click করলেন। এখন সেটা "চলতে" শুরু করেছে — সেটাই <Term id="process">process</Term>।</>)}
            {p('সহজ কথায় — একটা recipe (program) আর সেই recipe দেখে রান্না করা (process), দুই জিনিস। একই recipe দিয়ে দশজন রাঁধুনি দশটা আলাদা রান্না করতে পারেন। তেমনি একই program থেকে অনেকগুলো process চলতে পারে। Chrome খুলে ২০টা tab খুললেন — প্রায়ই প্রতিটার জন্য একটা করে আলাদা process।')}
          </div>
        ) : (
          <div style={body}>
            {p('The distinction matters up front. These two words often get mixed up, but they mean different things.')}
            {p(<>A <strong>program</strong> is a {MONO('.exe')} or {MONO('.app')} file sitting on disk. Code and data, organized into a structured file. Right now it isn't doing anything — just sitting there.</>)}
            {p(<>Double-click that file. Now it's starting to "run" — that's a <Term id="process">process</Term>.</>)}
            {p("Simply put: a recipe (program) and someone actually cooking with it (process) are two different things. Ten cooks can make ten different meals from the same recipe. Likewise, many processes can run from the same program. Open Chrome, open 20 tabs — often each gets its own process.")}
          </div>
        )}
      </Section>

      <Section num="02" bnH2="একটা process-এর ভেতরে কী থাকে?" enH2="What lives inside a process?">
        {bn ? (
          <div lang="bn" style={body}>
            {p('OS যখন একটা process তৈরি করে, তখন তার জন্য একটা পুরো "workspace" প্রস্তুত করে দেয়। এর কয়েকটা নির্দিষ্ট অংশ থাকে:')}
            {ul([
              <><strong>PID</strong> — process-এর unique নম্বর, যাতে OS বুঝতে পারে কোন process-এর কথা হচ্ছে।</>,
              <><strong>Code section:</strong> program-এর instruction। এই অংশ read-only — যাতে program ভুল করে বা কেউ ইচ্ছে করে নিজের কোড পাল্টে ফেলতে না পারে।</>,
              <><strong>Data section:</strong> শুরু থেকে শেষ পর্যন্ত টিকে থাকা variable — যেমন function-এর বাইরে declare করা {MONO('int counter = 0;')}।</>,
              <><strong>Stack:</strong> function call-এর parameter আর local variable-এর সাময়িক জায়গা। শেষ যে function call হয়েছে সে-ই আগে শেষ হয় — এই "last-in, first-out" pattern-ই stack।</>,
              <><strong>Heap:</strong> চলাকালীন হঠাৎ বড় object বানাতে হলে dynamic memory আসে heap থেকে ({MONO('malloc()')}, {MONO('new')})।</>,
              <><strong>File descriptors:</strong> খোলা file আর network connection-এর "handle" — ছোট নম্বর, যা দিয়ে পরে সেই connection-এ কাজ করা যায়।</>,
              <><strong>Register state:</strong> এই process CPU-তে চলাকালীন register-এ যা ছিল — সরিয়ে দেওয়ার আগে সব save করে রাখতে হয়।</>,
            ])}
            {p(<>এই সবকিছু OS একটা কেন্দ্রীয় জায়গায় track করে রাখে, যাকে বলে <Term id="pcb">PCB</Term> (Process Control Block)। OS-এর কাছে প্রতিটা process মানে PCB টেবিলে একটা entry। নিচের যন্ত্রে process-এর memory কীভাবে সাজানো, নিজেই বানিয়ে দেখুন:</>)}
          </div>
        ) : (
          <div style={body}>
            {p('When the OS creates a process, it sets up a whole "workspace" for it. That workspace has a few specific parts:')}
            {ul([
              <><strong>PID</strong> — the process's unique number, so the OS knows which process is being referred to.</>,
              <><strong>Code section:</strong> the program's instructions. Read-only — so the program can't accidentally (or maliciously) rewrite its own code.</>,
              <><strong>Data section:</strong> variables that live from start to finish — like a global {MONO('int counter = 0;')} declared outside any function.</>,
              <><strong>Stack:</strong> temporary space for a function call's parameters and locals. The function called last is the first to finish — that "last-in, first-out" pattern is the stack.</>,
              <><strong>Heap:</strong> when the program suddenly needs a big object mid-run, dynamic memory comes from the heap ({MONO('malloc()')}, {MONO('new')}).</>,
              <><strong>File descriptors:</strong> the "handles" for open files and network connections — small numbers used to work with a connection later.</>,
              <><strong>Register state:</strong> whatever was in the CPU registers while this process ran — all saved before it's moved off.</>,
            ])}
            {p(<>The OS tracks all of this in one central place — the <Term id="pcb">PCB</Term> (Process Control Block). To the OS, every process is one entry in a PCB table. Build up a process's memory layout on the instrument below:</>)}
          </div>
        )}
        <ProcessAnatomy />
      </Section>

      <Section num="03" bnH2="এক CPU-তে অনেকজন: পালা-বদল" enH2="Many on one CPU: taking turns">
        {bn ? (
          <div lang="bn" style={body}>
            {p('আসল প্রশ্ন। CPU একটাই (বা কয়েকটা core), process অনেকগুলো। OS প্রতিটা process-কে সামান্য সময়ের জন্য CPU-তে বসিয়ে দেয় — সাধারণত ১ থেকে ১০ millisecond। সময় শেষ হলে, বা process নিজে থেকে থামলে (যেমন disk থেকে ডেটার জন্য অপেক্ষা), OS তাকে সরিয়ে অন্যটাকে বসায়।')}
            {p('কল্পনা করুন পাঁচটা বিষয়ে homework করছেন — অংক, বাংলা, ইংরেজি, বিজ্ঞান, সমাজ। সবগুলো একসাথে করা যায় না, তাই একটা একটা করে করেন। কিন্তু এক বিষয় থেকে আরেকটায় যাওয়ার আগে কয়েকটা কাজ করতে হয়: চলতি বইয়ের পাতায় bookmark রাখা, যা ভাবছিলেন তা এক কোণে টুকে রাখা, বই বন্ধ করা, পরের বিষয়ের বই খোলা, যেখানে থেমেছিলেন সেই পাতায় যাওয়া, আর গতবার কী ভাবছিলেন মনে করা। তবেই কাজ আবার শুরু হয়।')}
            {p(<>এই "সরানো আর বসানো"-র নাম <Term id="contextswitch">context switch</Term>। CPU-র "মাথায়" (register-এ) যা ছিল — কোন instruction, কোন value hand-এ — সব save হয় process-এর PCB-তে। তারপর নতুন process-এর PCB থেকে তার আগের "মাথার অবস্থা" আবার CPU-তে load করা হয়।</>)}
            {p('CPU নিজে জানে না কতগুলো process আছে; সে শুধু যা দেওয়া হচ্ছে execute করে যায়। OS-ই প্রতি কয়েক millisecond অন্তর তার সামনে নতুন process দাঁড় করিয়ে দিচ্ছে। নিচে এক ধাপ এক ধাপ করে switch-টা ঘটিয়ে দেখুন:')}
          </div>
        ) : (
          <div style={body}>
            {p("The real question. There's one CPU (or a few cores) but many processes. The OS gives each a tiny slice of CPU time — typically 1 to 10 milliseconds. When the slice ends, or the process stops on its own (waiting for disk data, say), the OS moves it off and puts another on.")}
            {p("Imagine doing homework in five subjects — math, Bangla, English, science, social studies. You can't do them all at once, so you do one at a time. But before switching from one to another, a few things have to happen: bookmark the current page, jot down whatever you were thinking on a scratch pad, close the book, open the next subject's book, go to where you last left off, and recall what you were thinking about last time. Only then does work resume.")}
            {p(<>That "moving off and putting on" is a <Term id="contextswitch">context switch</Term>. Everything in the CPU's "head" (its registers) — which instruction, which values it was holding — gets saved into the process's PCB. Then the next process's PCB is read and its prior "head state" is loaded back into the CPU.</>)}
            {p("The CPU itself doesn't know how many processes exist; it just executes whatever it's handed. The OS rotates a new process in front of it every few milliseconds. Step through one switch below:")}
          </div>
        )}
        <ContextSwitch />
        {bn ? (
          <div lang="bn" style={body}>{p('এই পালা-বদলের একটা দাম আছে। প্রতিবার save-load-এ সময় যায় — switch যত ঘন ঘন হবে, actual কাজের জন্য সময় ততই কম। তাই OS balance রাখার চেষ্টা করে: এত ঘন ঘন না, আবার এতটা কমও না যে user "hang" টের পায়।')}</div>
        ) : (
          <div style={body}>{p("This turn-taking has a cost. Every save-and-load takes time — the more frequent the switches, the less time is left for real work. So the OS strikes a balance: not so frequent that everything crawls, not so rare that users feel a \"hang\".")}</div>
        )}
      </Section>

      <Section num="04" bnH2="Scheduling: কার পালা এখন?" enH2="Scheduling: whose turn is it?">
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>যদি একই সময়ে ১০০টা process ready অবস্থায় থাকে, OS কীভাবে ঠিক করে পরের বার কে CPU পাবে? এই সিদ্ধান্তের নাম <Term id="scheduler">scheduling</Term>। নেয় OS-এর ভেতরের একটা algorithm — scheduler।</>)}
            {p('তিনটা কথা মাথায় রাখে: সবাই যেন fair chance পায়, জরুরি কাজ যেন আগে হয়, আর system যেন responsive থাকে। তিনটা একসাথে satisfy করা কঠিন, তাই নানা algorithm:')}
            {ul([
              <><strong>Round-Robin:</strong> সবাইকে সমান সময়। সরল, fair — কিন্তু cursor বা keyboard driver অন্যদের চেয়ে জরুরি হলেও সমান সময় পায়, ফলে lag।</>,
              <><strong>Priority-based:</strong> বেশি priority আগে চান্স পায়। কিন্তু low-priority process যদি কখনো CPU-ই না পায় — সেটাই "starvation"।</>,
              <>আগে Linux-এ ছিল <strong>CFS (Completely Fair Scheduler)</strong> — কে কম CPU time পেয়েছে তাকে পরের চান্স দিত। ২০২৩-এ Linux kernel 6.6-এ এর জায়গা নিয়েছে <strong>EEVDF</strong>, যেটা fairness-এর পাশাপাশি latency আরও সরাসরি সামলায়।</>,
            ])}
            {p('নিচের যন্ত্রে তিনটা policy চালিয়ে দেখুন — কে বারবার CPU পায়, আর কে অনাহারে থাকে:')}
          </div>
        ) : (
          <div style={body}>
            {p(<>If 100 processes are all ready at once, how does the OS decide who gets the CPU next? That decision is <Term id="scheduler">scheduling</Term>, made by an algorithm inside the OS — the scheduler.</>)}
            {p('It juggles three goals: everyone gets a fair chance, urgent work goes first, and the system stays responsive. Satisfying all three at once is hard, hence many algorithms:')}
            {ul([
              <><strong>Round-Robin:</strong> equal time to all. Simple, fair — but the cursor or keyboard driver, more urgent than others, gets the same slice, so it lags.</>,
              <><strong>Priority-based:</strong> higher priority is chosen first. But if a low-priority process never gets the CPU — that's "starvation".</>,
              <>Linux used <strong>CFS (Completely Fair Scheduler)</strong> for years — tracking CPU time per process, giving the next turn to whoever got the least. In 2023, Linux kernel 6.6 replaced it with <strong>EEVDF</strong>, which handles latency more explicitly alongside fairness.</>,
            ])}
            {p('Run all three policies below — watch who keeps getting the CPU, and who starves:')}
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

      <Section num="05" bnH2="Virtual Memory: প্রতিটা program-এর নিজের জগত" enH2="Virtual memory: every program's own world">
        {bn ? (
          <div lang="bn" style={body}>
            {p('Multitasking-এর আরেকটা সমস্যা — memory। Chrome, VS Code, Spotify সবাই একই RAM ব্যবহার করছে। Chrome যদি ভুল করে সেই address-এ লেখে যেখানে VS Code-এর ডেটা, VS Code crash করবে। আরও খারাপ — একটা malicious app যদি অন্যের password পড়ে ফেলে?')}
            {p('তাই OS একটা কৌশল বার করেছে: প্রতিটা process-কে নিজের একটা পুরো memory এলাকা দাও, যেখানে সে ভাবতে পারে পুরো RAM তার একার। মাঝখানে বসানো হয়েছে একটা "অনুবাদক"।')}
            {p(<>Program যখন লেখে "address ১০০-তে রাখো", সে ভাবে actual RAM-এর ১০০ নম্বরে রাখছে। কিন্তু সেই "১০০" একটা <Term id="virtualmem">virtual address</Term> — কল্পিত। মাঝখানের hardware unit (MMU — Memory Management Unit) সেটা instant translate করে actual physical address-এ। এই অনুবাদের rule OS তৈরি করে — প্রতিটা process-এর জন্য একটা page table। নিচে দুই process টগল করে দেখুন একই virtual address কীভাবে ভিন্ন জায়গায় যায়:</>)}
          </div>
        ) : (
          <div style={body}>
            {p("Another multitasking problem — memory. Chrome, VS Code and Spotify all share the same RAM. If Chrome accidentally writes where VS Code's data lives, VS Code crashes. Worse — what if a malicious app deliberately reads another's password?")}
            {p("So the OS came up with a trick: give every process its own complete memory area where it can believe the whole RAM is its own. A \"translator\" sits in the middle.")}
            {p(<>When a program writes "put this at address 100", it thinks it's using physical RAM address 100. But that "100" is a <Term id="virtualmem">virtual address</Term> — imaginary. A hardware unit (the MMU — Memory Management Unit) instantly translates it to a real physical address. The OS sets up the translation rules — one page table per process. Toggle between two processes below and watch the same virtual address land in different places:</>)}
          </div>
        )}
        <MMUTranslator />
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>দুই বড় সুবিধা: <strong>Isolation</strong> — এক process আরেকটার memory-তে ঢুকতেই পারে না, কারণ তার page table তাকে সেই এলাকায় নিয়েই যায় না। এটাই আধুনিক security-র foundation। আর <strong>বেশি memory-র illusion</strong> — যা এই মুহূর্তে লাগছে না, OS তা disk-এ সরিয়ে রাখতে পারে, দরকারে ফিরিয়ে আনে (একে বলে swap)। যদি চাওয়া page RAM-এ না থাকে, ঘটে একটা <Term id="pagefault">page fault</Term>।</>)}
            {p('সহজ কথায় — virtual memory হলো OS-এর বলা একটা মধুর মিথ্যে। প্রতিটা program ভাবে সে-ই computer-এর একমাত্র রাজা। বাস্তবে ৫০ জন রাজা পাশাপাশি বসে আছে, কেউ কাউকে দেখতে পাচ্ছে না।')}
          </div>
        ) : (
          <div style={body}>
            {p(<>Two big wins: <strong>isolation</strong> — one process can't even reach another's memory, because its page table doesn't lead there. This is the foundation of modern security. And the <strong>illusion of more memory</strong> — whatever isn't needed right now, the OS can move to disk and pull back on demand (this is swap). If a requested page isn't in RAM, a <Term id="pagefault">page fault</Term> occurs.</>)}
            {p("Put simply — virtual memory is a sweet lie the OS tells. Every program thinks it's the only king of the computer. In reality, fifty kings are sitting side by side, none of them seeing any other.")}
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

      <Section num="06" bnH2="Kernel Mode আর User Mode: দুই স্তরের দরজা" enH2="Kernel mode and user mode: two levels of doors">
        {bn ? (
          <div lang="bn" style={body}>
            {p('এবার security-র আরেকটা fundamental separation। Windows-এ Admin আর regular user-এর পার্থক্য জানেন — Admin সব পারে, regular user restricted। CPU-রও ঠিক তেমন দুই mode:')}
            {ul([
              <><strong>Kernel Mode = admin mode।</strong> এই mode-এর code যা খুশি পারে — hardware-এ direct access, অন্য process-এর memory দেখা, page table পাল্টানো। শুধু OS-এর নিজের code এখানে চলে।</>,
              <><strong>User Mode = restricted mode।</strong> hardware-এ direct access নেই; sensitive operation করার চেষ্টা করলে CPU নিজে থেকেই থামিয়ে দেয়। সব regular app এখানে — browser, editor, game।</>,
            ])}
            {p(<>কেন এই বিভাজন? যদি প্রতিটা app যা খুশি করতে পারত, একটা bad app পুরো system-এ ছড়িয়ে পড়ত। কিন্তু app-এর তো hardware লাগে এমন কাজ করতেই হয় — file পড়া, network, screen। সে করে কীভাবে? OS-এর কাছে অনুরোধ করে। সেই দরজার নাম <Term id="syscall">System Call</Term>। C-তে একটা সহজ উদাহরণ:</>)}
          </div>
        ) : (
          <div style={body}>
            {p("Now another fundamental separation, from the security angle. You know the Admin vs regular-user split on Windows — Admin can do anything, a regular user is restricted. The CPU has exactly two such modes:")}
            {ul([
              <><strong>Kernel mode = admin mode.</strong> Code here can do anything — direct hardware access, read any process's memory, change page tables. Only the OS's own code runs here.</>,
              <><strong>User mode = restricted mode.</strong> No direct hardware access; attempt a sensitive operation and the CPU shuts it down itself. All regular apps run here — browser, editor, game.</>,
            ])}
            {p(<>Why the split? If every app could do anything, one bad app could take down the whole system. But apps do need hardware — reading files, networking, drawing to the screen. How? They ask the OS. That doorway is the <Term id="syscall">system call</Term>. A simple example in C:</>)}
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
            {p(<>এই {MONO('open()')}, {MONO('read()')}, {MONO('close()')} দেখতে সাধারণ function call, কিন্তু ভেতরে এরা CPU-কে একটা special instruction (x86-64-এ {MONO('syscall')}) চালাতে বলে — যা CPU-কে বলে "user mode থেকে kernel mode-এ যাও, OS-এর কাছে গিয়ে কাজটা করে ফিরে এসো"। নিচের যন্ত্রে দরজাটা এক ধাপ এক ধাপে পার হয়ে দেখুন:</>)}
          </div>
        ) : (
          <div style={body}>
            {p(<>These {MONO('open()')}, {MONO('read()')}, {MONO('close()')} look like ordinary function calls, but inside they tell the CPU to run a special instruction ({MONO('syscall')} on x86-64) that says "switch from user mode to kernel mode, go to the OS, do this, and come back". Step through the doorway on the instrument below:</>)}
          </div>
        )}
        <SyscallDoorway />
        {bn ? (
          <div lang="bn" style={body}>{p(<>সব ধরনের কাজের জন্যই system call আছে — file ({MONO('open/read/write/close')}), network ({MONO('socket/send/recv')}), process ({MONO('fork/exit')}), memory ({MONO('mmap')})। কিন্তু এই transition একটু costly — প্রতি call-এ CPU cycle যায়। তাই performance-সচেতন code যতটা সম্ভব কম system call করে।</>)}</div>
        ) : (
          <div style={body}>{p(<>There's a system call for every kind of work — file ({MONO('open/read/write/close')}), network ({MONO('socket/send/recv')}), process ({MONO('fork/exit')}), memory ({MONO('mmap')}). But the transition is a little costly — every call burns CPU cycles. So performance-conscious code makes as few system calls as it can.</>)}</div>
        )}
      </Section>

      <Section num="07" bnH2="Thread: এক process-এর ভেতরে অনেক worker" enH2="Threads: many workers inside one process">
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>Chrome-এ ২০টা tab মানে ২০টা full process বানালে খুব expensive — প্রতিটার আলাদা memory setup, আলাদা page table। কখনো এক process-এর ভেতরেই অনেক কাজ একসাথে দরকার, কিন্তু আলাদা memory লাগে না, কারণ সবার ডেটা share করা লাগবে। এখানে আসে <Term id="thread">thread</Term>।</>)}
            {p('Process যদি একটা কারখানা হয়, thread হলো সেই কারখানার শ্রমিক। একই মেশিন, একই কাঁচামাল share করে, কিন্তু প্রতিটার নিজের কাজের ধারা। Thread-ও তাই: এক process-এর ভেতরে multiple thread একই memory, একই file connection share করে, কিন্তু প্রতিটার নিজস্ব stack আর register state।')}
          </div>
        ) : (
          <div style={body}>
            {p(<>If 20 Chrome tabs meant 20 full processes it would be expensive — each needs its own memory setup, its own page table. Sometimes many things must happen in parallel inside one process, but separate memory isn't needed because the data should be shared. Here come <Term id="thread">threads</Term>.</>)}
            {p("If a process is a factory, a thread is one of its workers — sharing the same machines and raw materials, but each with its own flow of work. Threads work the same way: inside one process, multiple threads share the same memory and file descriptors, but each has its own stack and register state.")}
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
                ? [['Memory', 'নিজস্ব', 'share করে'], ['তৈরির cost', 'বেশি', 'কম'], ['যোগাযোগ', 'কঠিন', 'সহজ (memory share)'], ['একজন crash করলে', 'অন্যরা বাঁচে', 'পুরো process crash']]
                : [['Memory', 'own', 'shared'], ['Creation cost', 'high', 'low'], ['Communication', 'hard', 'easy (shared memory)'], ['On a crash', 'others survive', 'whole process crashes']]
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
          <div lang="bn" style={body}>{p('Web browser সাধারণত এক tab-এই multiple thread ব্যবহার করে — একটা UI-র জন্য, একটা JavaScript-এর জন্য, একটা network-এর জন্য। সব একই process-এ, একই memory share করছে, কিন্তু কেউ কাউকে block করছে না।')}</div>
        ) : (
          <div style={body}>{p('A web browser typically uses multiple threads within a single tab — one for the UI, one for JavaScript, one for the network. All in one process, sharing memory, none blocking the others.')}</div>
        )}
      </Section>

      <Section num="08" bnH2="পুরো ছবি: 'A' keyboard থেকে screen পর্যন্ত" enH2="The whole picture: 'A' from keyboard to screen">
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>এবার সব একসাথে। ধরুন keyboard-এ 'A' চাপলেন। শুধু একটা keypress-এর জন্য কয়েক ডজন step, কয়েকটা context switch, কয়েকটা system call, একটা <Term id="interrupt">interrupt</Term> — আর সবার মাঝখানে OS conducting করছে। নিচে step চেপে পুরো relay-টা দেখুন:</>)}
          </div>
        ) : (
          <div style={body}>
            {p(<>Now everything at once. Say you press 'A' on the keyboard. For a single keypress: dozens of steps, several context switches, several system calls, one <Term id="interrupt">interrupt</Term> — and in the middle of it all, the OS conducting. Step through the whole relay below:</>)}
          </div>
        )}
        <KeypressRelay />
        {bn ? (
          <div lang="bn" style={body}>{p('এই কারণেই OS-কে "Grand Conductor" বলা হয়। Hardware আর application-এর মাঝখানে বসে সবকিছুর orchestra চালাচ্ছে, প্রতি nanosecond-এ — কে কখন কী করবে, সব সে ঠিক করে দিচ্ছে।')}</div>
        ) : (
          <div style={body}>{p('This is why the OS is called the "Grand Conductor". Sitting between hardware and applications, it runs the whole orchestra — every nanosecond, deciding who does what and when.')}</div>
        )}
        <Recap>
          {bn ? (
            <>
              <li>Program disk-এ পড়ে থাকে, process RAM-এ চলে। একই program থেকে অনেক process।</li>
              <li>CPU একটা, process অনেক — OS এত দ্রুত পালা করে switch করে যে "একসাথে" মনে হয়।</li>
              <li>Virtual memory প্রতিটা program-কে নিজের একটা জগত দেয় — কেউ কারো এলাকায় ঢুকতে পারে না।</li>
              <li>Kernel/user mode security-র foundation। Regular app hardware-এ direct access পায় না।</li>
              <li>System call-ই সেই দরজা, যেখান দিয়ে app OS-এর কাছে কাজ চেয়ে নেয়।</li>
              <li>Thread হলো process-এর ভেতরে concurrency — এক workspace, একাধিক worker।</li>
            </>
          ) : (
            <>
              <li>A program sits on disk, a process runs in RAM. Many processes can spawn from one program.</li>
              <li>One CPU, many processes — the OS switches so fast that "at once" feels real.</li>
              <li>Virtual memory gives each program its own world — no one can step into another's territory.</li>
              <li>Kernel/user mode is the foundation of security. Regular apps can't touch hardware directly.</li>
              <li>The system call is the doorway where an app asks the OS to do work on its behalf.</li>
              <li>A thread is concurrency inside a process — one workspace, many workers.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={{ label: { bn: 'সিরিজ hub', en: 'series hub' }, title: 'The Machine Beneath Your Code', href: '/writing/tech-articles', variant: 'hub' }}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৭ — কোড থেকে মেশিন কোড' : '07 — Code to Machine Code', href: '#', variant: 'next' }}
        bridge={{
          bn: 'Hardware দেখা হলো, OS দেখা হলো। কিন্তু আপনি যে code লেখেন — JavaScript, Python, Go — সেটা তো CPU-র নিজের ভাষা না। CPU শুধু machine code বোঝে, সেই hex numbers। মাঝখানে তাহলে কী ঘটে? আপনার লেখা text file কীভাবে CPU-র জন্য executable instruction হয়ে যায়? Compiler, interpreter, JIT — এদের গল্প পরের আর্টিকেলে।',
          en: 'Hardware — done. OS — done. But the code you write — JavaScript, Python, Go — isn\'t the CPU\'s own language. The CPU only understands machine code, those hex numbers. So what happens in between? How does the text file you write become executable CPU instructions? Compiler, interpreter, JIT — that\'s the next article\'s story.',
        }}
      />
      <Colophon />
    </article>
  );
}
