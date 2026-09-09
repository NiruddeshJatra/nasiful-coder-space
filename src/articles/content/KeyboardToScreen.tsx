import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Deeper } from '../primitives/Deeper';
import { Recap } from '../primitives/Recap';
import { RelayNav } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { useProse, LINK, mono as MONO } from '../primitives/useProse';
import { KeyMatrixScan } from '../widgets/KeyMatrixScan';
import { Rasterize } from '../widgets/Rasterize';
import { FullRelay } from '../widgets/FullRelay';

/** Reading-list rows: title, where to find it, and the blurb. */
type Res = { name: string; where?: string; bn: string; en: string };

const READING: { bnGroup: string; enGroup: string; items: Res[] }[] = [
  {
    bnGroup: 'একদম শুরু থেকে বুঝতে চাইলে',
    enGroup: 'Starting from the beginning',
    items: [
      {
        name: 'Crash Course Computer Science',
        bn: 'YouTube-এ ৪০ পর্বের একটা সিরিজ, প্রতিটা ১০-১৫ মিনিট। Transistor থেকে AI পর্যন্ত পুরো computing-এর মানচিত্র। ভাষা সহজ, উপস্থাপনা চমৎকার। শুরু করার জন্য এর চেয়ে ভালো কিছু নেই।',
        en: 'a 40-episode YouTube series, 10-15 minutes each. Maps the whole of computing from transistors to AI. Clear language, excellent production. There is nothing better to start with.',
      },
      {
        name: 'Ben Eater',
        bn: 'YouTube channel। এই ভদ্রলোক breadboard-এ তার দিয়ে একটা সম্পূর্ণ 8-bit computer বানিয়েছেন, আর প্রতিটা ধাপ ক্যামেরার সামনে ব্যাখ্যা করেছেন। Article 1 আর 3-এ যা পড়েছেন, সেটা চোখের সামনে তৈরি হতে দেখতে পারবেন। ধৈর্য ধরে দেখার মতো জিনিস।',
        en: 'a YouTube channel. This man built a complete 8-bit computer on breadboards with wires, and explained every step on camera. Everything you read in Articles 1 and 3, you can watch being built. Worth the patience.',
      },
      {
        name: 'Nand2Tetris',
        where: 'nand2tetris.org',
        bn: 'শুধু একটা NAND gate থেকে শুরু করে ধাপে ধাপে একটা পুরো কম্পিউটার বানানোর কোর্স। CPU, assembler, VM, compiler, OS — সব নিজে হাতে। Coursera-তে বিনামূল্যে করা যায়। এই সিরিজের প্রায় সবকিছু এখানে হাতে-কলমে করে দেখা যাবে।',
        en: 'a course that starts with a single NAND gate and walks you up to a complete computer. CPU, assembler, VM, compiler, OS — you build all of it yourself. Free on Coursera. Almost everything in this series, done hands-on.',
      },
    ],
  },
  {
    bnGroup: 'Hardware আর CPU নিয়ে',
    enGroup: 'Hardware and CPUs',
    items: [
      {
        name: "Computer Systems: A Programmer's Perspective",
        bn: "Bryant ও O'Hallaron-এর লেখা। Carnegie Mellon-এর বিখ্যাত বই। Programmer-এর দৃষ্টিকোণ থেকে লেখা, তাই আপনার কোডের সাথে hardware-এর সম্পর্ক কোথায় সেটা স্পষ্ট হয়। Article 3, 4, 5-এর গভীর version।",
        en: "Bryant and O'Hallaron. The famous Carnegie Mellon book. Written from a programmer's perspective, so the connection between your code and the hardware stays visible throughout. The deep version of Articles 3, 4, and 5.",
      },
      {
        name: 'Computer Organization and Design',
        bn: 'Patterson ও Hennessy-র লেখা। Computer architecture-এর classic textbook। একটু ভারী, কিন্তু কর্তৃত্বপূর্ণ।',
        en: 'Patterson and Hennessy. The classic computer architecture textbook. Heavier going, but authoritative.',
      },
      {
        name: 'Inside the Machine',
        bn: 'Jon Stokes। আধুনিক processor-এর ভেতরটা ছবির সাহায্যে ব্যাখ্যা করা। Textbook-এর চেয়ে সহজ পাঠ।',
        en: 'Jon Stokes. Explains modern processors with illustrations. An easier read than a textbook.',
      },
    ],
  },
  {
    bnGroup: 'Memory আর Performance নিয়ে',
    enGroup: 'Memory and performance',
    items: [
      {
        name: 'What Every Programmer Should Know About Memory',
        bn: 'Ulrich Drepper-এর লেখা একটা দীর্ঘ প্রবন্ধ, বিনামূল্যে পাওয়া যায়। Article 5-এ যা ছুঁয়ে গেছি, তার সম্পূর্ণ রূপ। Cache, DRAM, NUMA — সব এখানে। খুঁজলেই PDF পাবেন।',
        en: 'a long paper by Ulrich Drepper, freely available. The complete version of what Article 5 touched on. Cache, DRAM, NUMA — all of it. Search for the PDF.',
      },
      {
        name: 'Latency Numbers Every Programmer Should Know',
        bn: 'Jeff Dean-এর তৈরি একটা ছোট তালিকা, ইন্টারনেটে সহজেই পাওয়া যায়। বিভিন্ন operation-এ কত সময় লাগে তার একটা mental model তৈরি করে দেয়।',
        en: 'a short table originally by Jeff Dean, easy to find online. Builds a mental model for how long different operations actually take.',
      },
    ],
  },
  {
    bnGroup: 'Operating System নিয়ে',
    enGroup: 'Operating systems',
    items: [
      {
        name: 'Operating Systems: Three Easy Pieces',
        where: 'ostep.org',
        bn: 'Arpaci-Dusseau দম্পতির লেখা। সম্পূর্ণ বিনামূল্যে, PDF আকারে ওয়েবসাইটেই আছে। OS শেখার জন্য সম্ভবত সবচেয়ে ভালো বই — লেখার ধরন সহজ, উদাহরণ প্রচুর। Article 6-এর প্রতিটা বিষয় এখানে বিস্তারিত।',
        en: 'by the Arpaci-Dusseaus. Completely free, full PDF on the website. Probably the best book for learning operating systems — readable style, plenty of examples. Every topic from Article 6 in full detail.',
      },
      {
        name: 'Linux Kernel Development',
        bn: 'Robert Love। Linux kernel-এর ভেতরটা কীভাবে কাজ করে জানতে চাইলে।',
        en: 'Robert Love. For getting inside the Linux kernel specifically.',
      },
    ],
  },
  {
    bnGroup: 'Compiler আর Language নিয়ে',
    enGroup: 'Compilers and languages',
    items: [
      {
        name: 'Crafting Interpreters',
        where: 'craftinginterpreters.com',
        bn: 'Robert Nystrom-এর লেখা, ওয়েবসাইটে সম্পূর্ণ বিনামূল্যে পড়া যায়। নিজে হাতে দুইটা interpreter বানানোর মধ্য দিয়ে পুরো বিষয়টা শেখানো হয়। লেখার মান অসাধারণ — technical বই এত সুন্দরভাবে কম লেখা হয়।',
        en: 'by Robert Nystrom, fully readable free on the site. Teaches the whole subject by having you build two interpreters by hand. The writing quality is exceptional — technical books are rarely this well made.',
      },
      {
        name: 'V8 blog',
        where: 'v8.dev/blog',
        bn: 'JavaScript engine-এর ভেতরে কী ঘটে, engineer-রা নিজেরাই লেখেন। JIT, garbage collection, optimization নিয়ে গভীর লেখা।',
        en: 'what happens inside a JavaScript engine, written by the engineers themselves. Deep posts on JIT, garbage collection, and optimization.',
      },
    ],
  },
  {
    bnGroup: 'হাতে-কলমে শিখতে চাইলে',
    enGroup: 'Learning by doing',
    items: [
      {
        name: 'nandgame.com',
        bn: 'ব্রাউজারেই NAND gate থেকে শুরু করে ধাপে ধাপে কম্পিউটার বানানোর একটা খেলা। বিনামূল্যে, মজার, আর শেখার জন্য চমৎকার।',
        en: 'a browser game that walks you from a NAND gate up to a computer. Free, fun, and genuinely educational.',
      },
      {
        name: 'CS50',
        where: 'Harvard',
        bn: 'YouTube আর edX-এ বিনামূল্যে। C থেকে শুরু করে পুরো computer science-এর ভিত্তি। শিক্ষকতার মান অসাধারণ।',
        en: 'free on YouTube and edX. Starts with C and covers the foundations of computer science. The teaching is superb.',
      },
    ],
  },
];

export function KeyboardToScreen() {
  const { bn, body, p } = useProse();

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={body}>
            {p("Keyboard-এ 'A' চাপলেন। এক মুহূর্ত পর screen-এ 'A' ফুটে উঠল।")}
            {p('আপনার কাছে মনে হলো instant। কোনো delay টের পাননি, কোনো অপেক্ষাও করতে হয়নি। আঙুল নামল আর অক্ষরটা চলে এল।')}
            {p('কিন্তু বাস্তবে সেটা instant ছিল না। মাঝখানে প্রায় ২০ থেকে ৩০ millisecond সময় লেগেছে, আর সেই সময়ের ভেতরে আপনার laptop-এ কয়েকটা সম্পূর্ণ আলাদা system একের পর এক কাজ করে গেছে। প্রতিটার দায়িত্ব ভিন্ন, প্রতিটা ভিন্ন সময়ে ভিন্ন মানুষের হাতে design করা, কিন্তু সবাই মিলে একসাথে কাজ করেছে।')}
            {p('এই সিরিজে এতদিন আমরা এই system-গুলোকে আলাদা আলাদা করে দেখেছি। আজ দেখব সবাই একসাথে কীভাবে কাজ করে। একটা মাত্র keystroke-কে follow করে পুরো পথটা হেঁটে যাব — আঙুলের চাপ থেকে শুরু করে চোখে আলো পড়া পর্যন্ত।')}
          </div>
        ) : (
          <div style={body}>
            {p("You press 'A' on your keyboard. A moment later, 'A' appears on the screen.")}
            {p('It felt instant to you. No delay you could detect, no waiting. Your finger went down and the character showed up.')}
            {p('But it was not instant. Roughly 20 to 30 milliseconds passed in between, and in that window several completely separate systems inside your laptop did their work one after another. Each has a different responsibility, each was designed by different people at different times, but together they got the job done.')}
            {p("Throughout this series we've looked at these systems one at a time. Today we watch them work together. We'll follow a single keystroke through the whole path — from the press of a finger to light hitting your eye.")}
          </div>
        )}
      </div>

      <Section num="01" bnH2="প্রথম চমক: keyboard-এরও নিজস্ব একটা CPU আছে" enH2="First surprise: your keyboard has its own CPU">
        {bn ? (
          <div lang="bn" style={body}>
            {p("'A' চাপলে সরাসরি laptop-এর CPU-তে কিছু যায় না। তার আগে সেই signal-কে থামতে হয় keyboard-এর নিজের ভেতরে বসে থাকা একটা ছোট্ট computer-এ।")}
            {p('শুনতে অদ্ভুত লাগতে পারে। Keyboard তো একটা input device মাত্র, তার আবার নিজের computer কেন থাকবে? কিন্তু আছে। এমনকি সবচেয়ে সস্তা keyboard-এও একটা tiny chip বসানো থাকে, যার ভেতরে থাকে একটা mini CPU, সামান্য memory, আর কিছু আগে থেকে লেখা instruction।')}
            {p('এই chip-এর কাজটা খুব নির্দিষ্ট। সে প্রতি কয়েক millisecond অন্তর পুরো keyboard scan করে যায়। প্রতিটা key-এর জন্য আলাদা তার নেই — সেটা করতে গেলে ১০৪টা তার লাগত। বদলে key-গুলো একটা grid-এ সাজানো, সারি আর কলাম মিলে। Chip একটা করে সারিতে current পাঠায় আর সব কলাম একসাথে পড়ে। কোন সারি আর কোন কলাম — এই দুইয়ের সংযোগ থেকেই বোঝা যায় কোন key চাপা হয়েছে।')}
            {p('যতক্ষণ কোনো key চাপা না হচ্ছে, কোনো কলামেই কিছু ধরা পড়ে না। কিন্তু যেই কোনো key চাপা হয়, সেই key-এর নিচের switch-এর দুইটা metal contact একসাথে লেগে যায়, সেই সারি আর সেই কলামের মাঝে circuit complete হয়ে যায়, আর chip ঐ কলামে voltage দেখতে পায়।')}
            {p(<>Chip সেই পরিবর্তনটা ধরে ফেলে। তারপর নিজের ভেতরের একটা lookup table থেকে খুঁজে বের করে — এই সারি আর এই কলামের সংযোগে কোন key বসে আছে? 'A' key-এর জন্য সে একটা নির্দিষ্ট byte তৈরি করে, ধরা যাক {MONO('0x04')}। সেই byte-টাই USB cable দিয়ে laptop-এ পাঠিয়ে দেয়। এই byte-টার নাম <Term id="scancode">scancode</Term>।</>)}
            {p('মানে laptop-এর main CPU কিছু জানার আগেই keyboard-এর ভেতরে একটা পুরো computing cycle শেষ হয়ে গেছে। Voltage পড়া হয়েছে, সিদ্ধান্ত নেওয়া হয়েছে, ডেটা তৈরি হয়েছে।')}
            {p(<>আর সেই ভেতরের CPU-ও কিন্তু আমাদের দেখা <a href="/writing/heartbeat-fde" style={LINK}>সেই একই নিয়মে</a> চলে — fetch করে, decode করে, execute করে। শুধু scale-টা অনেক ছোট। নিচের যন্ত্রে একটা key চেপে scan cycle-টা দেখুন:</>)}
          </div>
        ) : (
          <div style={body}>
            {p("When you press 'A', nothing goes directly to the laptop's CPU. Before that, the signal has to stop at a tiny computer sitting inside the keyboard itself.")}
            {p('It sounds strange. A keyboard is just an input device — why would it have its own computer? But it does. Even the cheapest keyboard has a tiny chip inside, holding a mini CPU, a small amount of memory, and some pre-written instructions.')}
            {p("That chip's job is very specific. Every few milliseconds it scans the whole keyboard. There isn't a separate wire for every key — that would take 104 wires. Instead the keys sit in a grid, at the intersections of rows and columns. The chip sends current down one row at a time and reads all the columns at once. Which row, and which column — the meeting point of those two is what tells it which key went down.")}
            {p('As long as no key is pressed, nothing shows up on any column. But the moment a key goes down, two metal contacts under that key touch, completing the circuit between that row and that column, and the chip sees voltage on that column.')}
            {p(<>The chip catches that change. Then it looks up its own internal table to figure out — which key sits at this row-and-column intersection? For the 'A' key it produces a specific byte, say {MONO('0x04')}. That byte gets sent to the laptop over the USB cable. That byte is called a <Term id="scancode">scancode</Term>.</>)}
            {p("So before the laptop's main CPU knows anything at all, a complete computing cycle has already finished inside the keyboard. Voltage was read, a decision was made, data was produced.")}
            {p(<>And that little CPU runs by <a href="/writing/heartbeat-fde" style={LINK}>the same rules</a> we've seen throughout this series — fetch, decode, execute. Just at a much smaller scale. Press a key on the instrument below to watch the scan cycle:</>)}
          </div>
        )}
        <KeyMatrixScan />
      </Section>

      <Section num="02" bnH2="Interrupt: CPU-কে থামানোর একমাত্র উপায়" enH2="Interrupt: the only way to stop a CPU">
        {bn ? (
          <div lang="bn" style={body}>
            {p('USB cable দিয়ে signal ঢুকল laptop-এ। Motherboard-এ বসে থাকা USB controller সেটা receive করল। এই controller একটা আলাদা chip, CPU-র বাইরে, যার একমাত্র কাজ USB device-এর সাথে কথা বলা।')}
            {p('Controller-এর কাছে এখন data আছে, কিন্তু CPU সেটা জানে না। CPU এই মুহূর্তে অন্য কাজে ব্যস্ত — হয়তো Chrome-এর কোনো JavaScript চালাচ্ছে, বা YouTube video decode করছে। তাকে জানাতে হবে যে নতুন কিছু এসেছে।')}
            {p(<>জানানোর একমাত্র উপায় হলো <Term id="interrupt">interrupt</Term>। Controller একটা নির্দিষ্ট pin-এর voltage বদলে দেয়, আর সেই wire সরাসরি CPU-তে গিয়ে ঠেকে।</>)}
            {p('Interrupt পাওয়ার সাথে সাথে CPU যা করছিল তা থামিয়ে দেয়। কিন্তু শুধু থামলেই তো হবে না। CPU-র register-এ এই মুহূর্তে যা কিছু আছে — কোন instruction চালাচ্ছিল, কোন value হাতে ধরা ছিল, সব সাময়িক হিসাব — সেসব হারিয়ে গেলে বিপদ। Interrupt handle করা শেষে যখন সে আগের কাজে ফিরবে, তখন সে জানতেই পারবে না কোথায় থেমেছিল।')}
            {p(<>তাই থামার আগে CPU সব state একটা নির্দিষ্ট memory area-তে save করে রাখে। এই কাজটা আমরা <a href="/writing/os-grand-conductor" style={LINK}>Article 6</a>-এ দেখেছিলাম — context switch-এর সময় যেভাবে process-এর "মাথার অবস্থা" PCB-তে জমা রাখা হয়, এখানেও প্রায় একই ব্যাপার, শুধু ছোট আকারে।</>)}
            {p('State save হয়ে গেলে CPU switch করে kernel mode-এ। এতক্ষণ সে user mode-এ ছিল, Chrome-এর code চালাচ্ছিল। এখন OS-এর code চালাতে হবে, আর সেই code-এর hardware access দরকার। তাই privilege level বদলাতেই হবে।')}
          </div>
        ) : (
          <div style={body}>
            {p('The signal came into the laptop over the USB cable. The USB controller sitting on the motherboard received it. This controller is a separate chip, outside the CPU, whose only job is talking to USB devices.')}
            {p("The controller now has data, but the CPU doesn't know that. The CPU is busy with something else at this moment — maybe running some Chrome JavaScript, maybe decoding a YouTube video. It needs to be told that something new arrived.")}
            {p(<>The only way to tell it is an <Term id="interrupt">interrupt</Term>. The controller changes the voltage on a specific pin, and that wire runs straight into the CPU.</>)}
            {p("The instant the interrupt arrives, the CPU stops what it was doing. But simply stopping isn't enough. Whatever is in the CPU's registers right now — which instruction it was running, which values it was holding, all the intermediate results — losing any of that would be a disaster. When it returns to its previous work after handling the interrupt, it wouldn't know where it had left off.")}
            {p(<>So before stopping, the CPU saves all its state into a designated memory area. This is the same operation we saw in <a href="/writing/os-grand-conductor" style={LINK}>Article 6</a> — the way a process's "head state" gets stored in its PCB during a context switch. Same idea here, just at a smaller scale.</>)}
            {p('Once the state is saved, the CPU switches into kernel mode. Until now it was in user mode, running Chrome\'s code. Now it has to run OS code, and that code needs hardware access. So the privilege level has to change.')}
          </div>
        )}
      </Section>

      <Section num="03" bnH2="OS-এর ভেতরে: এই event কার জন্য?" enH2="Inside the OS: who is this event for?">
        {bn ? (
          <div lang="bn" style={body}>
            {p('Interrupt handler চলতে শুরু করে। এই handler আসলে কী জিনিস? এটা Linux বা Windows kernel-এর একটা অংশ, যেটা বছর কয়েক আগে কোনো developer C-তে লিখেছিলেন। তারপর সেটা compile হয়ে machine code হয়েছে, আর আপনার laptop boot হওয়ার সময় সেই machine code memory-তে load হয়েছে। এই মুহূর্তে সেই বহু পুরনো compiled code-ই চলছে।')}
            {p("Handler প্রথমে USB controller থেকে scancode read করে নেয়। তারপর OS-এর keyboard driver সেই scancode দেখে বুঝে যায় — 'A' চাপা হয়েছে।")}
            {p('এখন প্রশ্ন হলো, এই তথ্যটা কার কাছে যাবে? আপনার laptop-এ তো এই মুহূর্তে ৫০টা program চলছে। সবাইকে জানানোর তো মানে হয় না।')}
            {p('OS জানে এই মুহূর্তে কোন window active আছে — যেটাকে বলে focused window। ধরা যাক সেটা VS Code। OS সেই window-এর সাথে যুক্ত process-টা খুঁজে বের করে, আর সেই process-এর জন্য যে event queue আছে, সেখানে event-টা রেখে দেয়।')}
            {p('কিন্তু এখানে একটা সমস্যা আছে। VS Code-এর process এই মুহূর্তে CPU-তে চলছে না। CPU-তে ছিল Chrome। তাহলে VS Code জানবে কীভাবে যে তার জন্য একটা event এসেছে?')}
            {p(<>এখানেই <Term id="scheduler">scheduler</Term>-এর ভূমিকা। <a href="/writing/os-grand-conductor" style={LINK}>Article 6</a>-এ দেখেছিলাম, প্রতিটা context switch-এ scheduler ঠিক করে দেয় পরের বার CPU কে পাবে। এখন তার সামনে একটা choice — Chrome-কে আবার resume করবে, নাকি VS Code-কে জাগিয়ে তুলবে?</>)}
            {p('Modern OS-এ interactive application-কে সাধারণত দ্রুত response দেওয়া হয়। কারণ user সরাসরি তাদের সাথে কাজ করছে, একটু দেরি হলেই "lag" মনে হবে। তাই scheduler সিদ্ধান্ত নেয় — VS Code-কে এখনই CPU দাও।')}
            {p(<>Context switch শুরু হয়। Chrome-এর সমস্ত state তার PCB-তে জমা হয়ে যায়। VS Code-এর PCB থেকে তার আগের state আবার CPU-তে load হয়। সাথে <Term id="virtualmem">virtual memory</Term>-র context-ও বদলে যায় — এখন থেকে CPU যেসব virtual address ব্যবহার করবে, সেগুলো VS Code-এর page table দিয়ে translate হবে, Chrome-এর নয়।</>)}
            {p('সব প্রস্তুত হলে CPU আবার user mode-এ ফিরে আসে, আর VS Code-এর code চালাতে শুরু করে।')}
          </div>
        ) : (
          <div style={body}>
            {p("The interrupt handler starts running. What is this handler, exactly? It's a piece of the Linux or Windows kernel that some developer wrote in C years ago. That code was then compiled into machine code, and when your laptop booted, that machine code was loaded into memory. Right now, that very old compiled code is what's running.")}
            {p("The handler first reads the scancode from the USB controller. Then the OS's keyboard driver looks at that scancode and figures out — 'A' was pressed.")}
            {p('Now the question is, who does this information go to? Fifty programs are running on your laptop at this moment. Telling all of them makes no sense.')}
            {p("The OS knows which window is currently active — what's called the focused window. Say that's VS Code. The OS finds the process attached to that window, and drops the event into that process's event queue.")}
            {p("But there's a problem here. VS Code's process isn't running on the CPU right now. Chrome was. So how does VS Code find out that an event arrived for it?")}
            {p(<>This is where the <Term id="scheduler">scheduler</Term> comes in. As we saw in <a href="/writing/os-grand-conductor" style={LINK}>Article 6</a>, at every context switch the scheduler decides who gets the CPU next. It now faces a choice — resume Chrome, or wake up VS Code?</>)}
            {p('Modern OSes typically give interactive applications faster response. Because the user is working with them directly, and any delay immediately feels like lag. So the scheduler decides — give VS Code the CPU right now.')}
            {p(<>The context switch begins. All of Chrome's state gets saved into its PCB. VS Code's earlier state gets loaded back from its PCB into the CPU. The <Term id="virtualmem">virtual memory</Term> context switches too — from now on, the virtual addresses the CPU uses get translated through VS Code's page table, not Chrome's.</>)}
            {p("Once everything's in place, the CPU returns to user mode and starts running VS Code's code.")}
          </div>
        )}
      </Section>

      <Section num="04" bnH2="App জেগে উঠল" enH2="The app wakes up">
        {bn ? (
          <div lang="bn" style={body}>
            {p('VS Code একটা Electron application, মানে মূলত JavaScript-এ লেখা। Chrome-এর যে V8 engine, সেটাই ভেতরে বসে এই JavaScript চালাচ্ছে।')}
            {p(<>VS Code-এর event loop-এ একটা {MONO('read()')} <Term id="syscall">system call</Term> অনেকক্ষণ ধরে pending অবস্থায় ছিল। সে user-এর input-এর অপেক্ষায় block হয়ে বসে ছিল। এখন OS-এর কাছে event ready, তাই সেই system call return করল, আর VS Code-এর হাতে 'A' character পৌঁছে গেল।</>)}
            {p(<>এই keystroke handle করার যে code, সেটা JavaScript-এ লেখা। কিন্তু <a href="/writing/code-to-machine-code" style={LINK}>আগের আর্টিকেলে</a> দেখেছি, V8 প্রথমে code-কে interpret করে চালায়, তারপর যেসব অংশ বারবার চলে সেগুলোকে <Term id="jit">JIT</Term> দিয়ে native machine code-এ compile করে ফেলে। Keystroke handler নিশ্চয়ই হাজার হাজার বার চলেছে। তাই এই মুহূর্তে সেটা আর interpret হচ্ছে না — সরাসরি compiled machine code-ই চলছে, প্রায় C-র মতো গতিতে।</>)}
            {p("Code বলল — cursor যেখানে আছে সেখানে 'A' লেখো। কিন্তু \"লেখা\" মানে screen-এ pixel বসানো। কোন pixel-এ কী রং হবে, সেটা কে ঠিক করবে?")}
          </div>
        ) : (
          <div style={body}>
            {p("VS Code is an Electron application, meaning it's mostly written in JavaScript. Chrome's V8 engine sits inside it and runs that JavaScript.")}
            {p(<>In VS Code's event loop, a {MONO('read()')} <Term id="syscall">system call</Term> had been pending for a while. It was blocked, waiting for user input. Now the OS has the event ready, so that system call returns, and the 'A' character lands in VS Code's hands.</>)}
            {p(<>The code handling this keystroke is written in JavaScript. But as we saw in <a href="/writing/code-to-machine-code" style={LINK}>the last article</a>, V8 first interprets code, then takes the parts that run repeatedly and <Term id="jit">JIT</Term>-compiles them into native machine code. This keystroke handler has surely run thousands of times. So right now it isn't being interpreted at all — the compiled machine code is running directly, at nearly C-level speed.</>)}
            {p('The code says — write \'A\' at the cursor position. But "writing" means placing pixels on the screen. Who decides which pixel gets what color?')}
          </div>
        )}
      </Section>

      <Section num="05" bnH2="অক্ষর থেকে pixel" enH2="From character to pixel">
        {bn ? (
          <div lang="bn" style={body}>
            {p('এখানে font system কাজে নামে। আপনার editor-এ যে font ব্যবহার করছেন — Consolas, Fira Code, যাই হোক — সেই font file আগে থেকেই RAM-এ load করা আছে।')}
            {p('Font file-এ প্রতিটা character-এর জন্য একটা করে shape-এর বর্ণনা থাকে। বেশিরভাগ modern font-এ সেই বর্ণনা vector আকারে — মানে গাণিতিক curve দিয়ে বলা থাকে অক্ষরটার আকৃতি কেমন হবে। এর সুবিধা হলো, যেকোনো size-এ scale করলেও অক্ষরটা ঝাপসা হয় না।')}
            {p(<>কিন্তু screen তো vector বোঝে না। Screen বোঝে pixel। তাই সেই vector shape-কে আপনার current font size অনুযায়ী pixel grid-এ রূপান্তর করতে হয়। এই প্রক্রিয়ার নাম <Term id="rasterization">rasterization</Term>।</>)}
            {p(<>Rasterization শেষে 'A' character আর অক্ষর থাকে না। এখন সেটা কয়েকশো pixel-এর একটা grid, যার প্রতিটা pixel-এর জন্য R, G, B value নির্ধারিত। <a href="/writing/how-does-anything-become-bits" style={LINK}>Article 2</a>-তে দেখেছিলাম কীভাবে ছবি binary হয় — এখানেও ঠিক তাই ঘটল। একটা অক্ষর এইমাত্র একটা ছোট্ট ছবিতে পরিণত হলো। নিচের যন্ত্রে vector থেকে pixel-এ যাওয়াটা দেখুন:</>)}
          </div>
        ) : (
          <div style={body}>
            {p("This is where the font system comes in. The font you're using in your editor — Consolas, Fira Code, whatever it is — has already been loaded into RAM.")}
            {p('A font file contains a shape description for every character. In most modern fonts, that description is in vector form — the shape of the letter is described mathematically with curves. The advantage is that scaling to any size keeps the letter crisp.')}
            {p(<>But screens don't understand vectors. Screens understand pixels. So that vector shape has to be converted into a pixel grid according to your current font size. That process is called <Term id="rasterization">rasterization</Term>.</>)}
            {p(<>After rasterization, 'A' is no longer a character. It's now a grid of a few hundred pixels, each with a determined R, G, B value. In <a href="/writing/how-does-anything-become-bits" style={LINK}>Article 2</a> we saw how images become binary — the same thing just happened here. A letter has become a small picture. Watch a vector become pixels on the instrument below:</>)}
          </div>
        )}
        <Rasterize />
      </Section>

      <Section num="06" bnH2="Framebuffer থেকে আলো" enH2="From framebuffer to light">
        {bn ? (
          <div lang="bn" style={body}>
            {p('VS Code এখন আরেকটা system call করে — "এই pixel data screen-এ দেখাও।" আবার user mode থেকে kernel mode-এ transition, আবার OS-এর দরজায় কড়া নাড়া।')}
            {p(<>OS-এর <Term id="compositor">window compositor</Term> এই data receive করে। Compositor-এর কাজ হলো সব window-এর content মিলিয়ে screen-এর final চেহারা তৈরি করা। সে জানে VS Code-এর window screen-এর ঠিক কোন জায়গায় বসানো, তাই সেই অনুযায়ী pixel-গুলোর সঠিক coordinate হিসাব করে।</>)}
            {p(<>তারপর সেই data লেখা হয় <Term id="framebuffer">framebuffer</Term>-এ। Framebuffer হলো GPU-র নিজস্ব memory-তে (VRAM) একটা বিশেষ এলাকা, যেখানে screen-এ এই মুহূর্তে যা দেখাচ্ছে তার পুরো ছবিটা bit আকারে জমা থাকে।</>)}
            {p('GPU প্রতি ১৬.৬৭ millisecond অন্তর (মানে 60Hz refresh rate-এ) সেই framebuffer পড়ে নেয় আর সেই ডেটা HDMI বা DisplayPort cable দিয়ে monitor-এ পাঠিয়ে দেয়। Cable-এর ভেতরে যা যাচ্ছে সেটা আসলে দ্রুত পরিবর্তিত voltage — high, low, high, low। সেই voltage pattern-ই pixel data-র binary রূপ।')}
            {p(<>এই সিরিজের <a href="/writing/whats-inside-a-bit" style={LINK}>একদম প্রথম আর্টিকেলে</a> আমরা যেখান থেকে শুরু করেছিলাম, ঘুরে ফিরে সেই voltage-এই ফিরে এলাম।</>)}
            {p('Monitor-এর ভেতরের controller সেই signal receive করে। LCD screen-এ প্রতিটা pixel-এর পেছনে থাকে liquid crystal, আর controller সেই crystal-এর orientation নিয়ন্ত্রণ করে ঠিক করে দেয় কোন pixel দিয়ে কতটুকু আলো যাবে। OLED-এ ব্যাপারটা আরও সরাসরি — প্রতিটা pixel নিজেই আলো তৈরি করে।')}
            {p("'A' অক্ষরের আকৃতি অনুযায়ী নির্দিষ্ট pixel-গুলোতে voltage গেল। সেই pixel-গুলো আলো ছাড়ল। Photon বেরিয়ে এসে আপনার চোখে পড়ল।")}
            {p("আপনি screen-এ 'A' দেখলেন।")}
          </div>
        ) : (
          <div style={body}>
            {p('VS Code now makes another system call — "show this pixel data on screen." Another user-to-kernel transition, another knock on the OS\'s door.')}
            {p(<>The OS's <Term id="compositor">window compositor</Term> receives this data. The compositor's job is to combine the content of all windows into the screen's final appearance. It knows exactly where VS Code's window sits on the screen, so it computes the right coordinates for those pixels.</>)}
            {p(<>Then that data gets written into the <Term id="framebuffer">framebuffer</Term>. The framebuffer is a special area in the GPU's own memory (VRAM) that holds, in bits, the complete current picture of what the screen is showing.</>)}
            {p('Every 16.67 milliseconds (at a 60Hz refresh rate) the GPU reads that framebuffer and sends the data over an HDMI or DisplayPort cable to the monitor. What travels through that cable is rapidly changing voltage — high, low, high, low. That voltage pattern is the binary form of the pixel data.')}
            {p(<>We've come full circle back to the voltage we started with in <a href="/writing/whats-inside-a-bit" style={LINK}>the very first article</a> of this series.</>)}
            {p("The controller inside the monitor receives that signal. In an LCD screen, each pixel has liquid crystal behind it, and the controller adjusts the orientation of that crystal to decide how much light passes through each pixel. In OLED, it's more direct — each pixel generates its own light.")}
            {p("Voltage went to the pixels matching the shape of 'A'. Those pixels emitted light. Photons left the glass and hit your eye.")}
            {p("You saw 'A' on the screen.")}
          </div>
        )}
        <Deeper
          bnLabel="আরেকটু গভীরে — DMA, vsync, subpixel rendering"
          enLabel="go deeper — DMA, vsync, subpixel rendering"
        >
          {bn ? (
            <ul lang="bn" style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>DMA:</strong> GPU framebuffer বারবার CPU-কে না জ্বালিয়ে সরাসরি RAM থেকে পড়তে পারে — এই Direct Memory Access-এ CPU মুক্ত থাকে, শুধু ডেটা চলাচল হয়।</li>
              <li style={{ marginBottom: 10 }}><strong>Vsync আর tearing:</strong> GPU যদি screen refresh-এর মাঝপথে framebuffer বদলায়, উপরে-নিচে দুটো frame মিশে যায় — screen tearing। Vsync (আর double buffering) refresh সীমানার সাথে update মিলিয়ে সেটা ঠেকায়।</li>
              <li><strong>Subpixel rendering:</strong> প্রতিটা pixel আসলে তিনটে ছোট আলো — R, G, B পাশাপাশি। Text renderer এগুলো আলাদা করে ব্যবহার করে অক্ষরের কিনারা আরও মসৃণ দেখায় (ClearType, এর একটা উদাহরণ)।</li>
            </ul>
          ) : (
            <ul style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>DMA:</strong> the GPU can read the framebuffer straight from RAM without repeatedly bothering the CPU — this Direct Memory Access frees the CPU while data just flows.</li>
              <li style={{ marginBottom: 10 }}><strong>Vsync and tearing:</strong> if the GPU swaps the framebuffer mid-refresh, two frames blend across the screen — screen tearing. Vsync (with double buffering) aligns updates to refresh boundaries to prevent it.</li>
              <li><strong>Subpixel rendering:</strong> each pixel is really three tiny lights — R, G, B side by side. Text renderers use them separately to make letter edges look smoother (ClearType is one example).</li>
            </ul>
          )}
        </Deeper>
      </Section>

      <Section num="07" bnH2="২০ millisecond-এ কত কিছু" enH2="So much in 20 milliseconds">
        {bn ? (
          <div lang="bn" style={body}>
            {p('আপনার কাছে পুরোটা instant মনে হয়েছে। এক আঙুলের চাপ, সাথে সাথে অক্ষর। নিচের যন্ত্রে পুরো relay-টা এক ধাপ এক ধাপ করে চালিয়ে দেখুন — keypress থেকে চোখে আলো পর্যন্ত:')}
          </div>
        ) : (
          <div style={body}>
            {p('The whole thing felt instant to you. One press of a finger, and immediately a letter. Step (or run) the full relay below — from keypress to light in your eye:')}
          </div>
        )}
        <FullRelay />
        {bn ? (
          <div lang="bn" style={body}>
            {p('কিন্তু এই সময়টুকুর ভেতরে ঘটে গেছে অনেক কিছু। Keyboard-এর নিজস্ব CPU একটা পুরো scan cycle চালিয়েছে। USB controller signal তৈরি করেছে। Main CPU একটা interrupt সামলেছে, নিজের state save করেছে, privilege level বদলেছে। OS-এর driver ডেটা পড়েছে, ঠিক করেছে কোন application এই event পাবে। Scheduler সিদ্ধান্ত নিয়েছে কাকে CPU দেওয়া হবে। একটা full context switch হয়েছে, page table বদলেছে। JIT-compiled JavaScript চলেছে। Font system একটা অক্ষরকে ছবিতে রূপান্তর করেছে। GPU framebuffer update করেছে। Cable-এ voltage-এর ঢেউ গেছে। Monitor-এর pixel জ্বলে উঠেছে।')}
            {p(<>এই সময়ে CPU-তে কয়েক বিলিয়ন instruction execute হয়েছে। <a href="/writing/memory-hierarchy" style={LINK}>Cache line</a> RAM থেকে L3, L2 হয়ে L1-এ এসেছে বহুবার। Page table lookup হয়েছে প্রতিটা memory access-এ। দুই-তিনটা context switch হয়েছে।</>)}
            {p('আর সবচেয়ে আশ্চর্যের ব্যাপার হলো, এই পুরো chain-এর প্রতিটা অংশ আলাদা আলাদা মানুষ, আলাদা কোম্পানি, আলাদা সময়ে তৈরি করেছে। Keyboard-এর firmware লিখেছে এক দল, USB protocol design করেছে আরেক দল, kernel-এর driver লিখেছে অন্য কেউ, V8 engine বানিয়েছে Google-এর একটা team, font rendering library লিখেছে আরও কেউ। কেউ কারো সাথে বসে আলোচনা করেনি।')}
            {p('তবু সবাই মিলে flawlessly কাজ করেছে। কারণ প্রতিটা layer পরের layer-এর জন্য একটা পরিষ্কার contract রেখে গেছে — "তুমি আমাকে এই format-এ ডেটা দাও, আমি এই কাজটা করে দেব।" ভেতরে কী হচ্ছে সেটা জানার দরকার নেই।')}
            {p(<>এটাই <Term id="abstraction">abstraction</Term>। এবং এটাই আধুনিক computing-এর সবচেয়ে বড় শক্তি।</>)}
          </div>
        ) : (
          <div style={body}>
            {p("But inside that window, a lot happened. The keyboard's own CPU ran a full scan cycle. The USB controller generated a signal. The main CPU handled an interrupt, saved its state, changed privilege level. The OS's driver read the data and decided which application should receive the event. The scheduler decided who gets the CPU. A full context switch happened, page tables changed. JIT-compiled JavaScript ran. The font system converted a letter into a picture. The GPU updated a framebuffer. A wave of voltage went down a cable. Pixels on the monitor lit up.")}
            {p(<>In that time the CPU executed billions of instructions. <a href="/writing/memory-hierarchy" style={LINK}>Cache lines</a> moved from RAM through L3 and L2 into L1, many times over. A page table lookup happened on every memory access. Two or three context switches occurred.</>)}
            {p('And the most remarkable part is this — every piece of that chain was built by different people, different companies, at different times. One team wrote the keyboard\'s firmware, another designed the USB protocol, someone else wrote the kernel driver, a team at Google built the V8 engine, someone else wrote the font rendering library. None of them sat down together to discuss anything.')}
            {p('Yet they all worked together flawlessly. Because each layer left a clear contract for the next — "give me data in this format, and I\'ll do this job." Nobody needs to know what\'s happening inside anyone else.')}
            {p(<>That's <Term id="abstraction">abstraction</Term>. And it's the greatest strength of modern computing.</>)}
          </div>
        )}
        <Recap>
          {bn ? (
            <>
              <li>Keyboard-এর নিজের একটা CPU আছে — সে সারি-কলামের grid scan করে, byte বানায়, তারপর USB-তে পাঠায়।</li>
              <li>Interrupt-ই CPU-কে থামানোর একমাত্র উপায়; থামার আগে সে নিজের state save করে kernel mode-এ যায়।</li>
              <li>OS event-টা focused window-এর queue-তে রাখে, scheduler সেই app-কে CPU দেয় — একটা context switch।</li>
              <li>App-এর JIT-compiled code অক্ষরটা নেয়; font system সেটাকে rasterize করে pixel বানায়।</li>
              <li>Compositor → framebuffer → GPU → cable-এ voltage → monitor-এর pixel জ্বলে ওঠে। ঘুরে সেই voltage-এ ফেরত।</li>
              <li>প্রতিটা layer আলাদা মানুষ বানিয়েছে, তবু contract মেনে সবাই একসাথে কাজ করে — এটাই abstraction।</li>
            </>
          ) : (
            <>
              <li>The keyboard has its own CPU — it scans a row/column grid, makes a byte, then sends it over USB.</li>
              <li>An interrupt is the only way to stop a CPU; before stopping it saves its state and enters kernel mode.</li>
              <li>The OS drops the event in the focused window's queue; the scheduler gives that app the CPU — a context switch.</li>
              <li>The app's JIT-compiled code takes the letter; the font system rasterizes it into pixels.</li>
              <li>Compositor → framebuffer → GPU → voltage down the cable → the monitor's pixels light up. Back to voltage.</li>
              <li>Every layer was built by different people, yet they work together on a contract — that's abstraction.</li>
            </>
          )}
        </Recap>
      </Section>

      <Section num="08" bnH2="সিরিজের শেষে" enH2="At the end of the series">
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>আটটা আর্টিকেল আগে শুরু করেছিলাম একটা সহজ প্রশ্ন দিয়ে — {MONO('x = 5')} লিখলে সেই ৫ সংখ্যাটা কম্পিউটারের কোথায় যায়?</>)}
            {p('উত্তরটা খুঁজতে গিয়ে আমাদের অনেক দূর যেতে হয়েছে। Transistor থেকে শুরু করে logic gate, gate থেকে latch, latch থেকে register। তারপর binary encoding, CPU-র ভেতরের ALU আর bus, fetch-decode-execute-এর অবিরাম চক্র। এরপর memory hierarchy, cache-এর চতুরতা, locality-র সৌন্দর্য। তারপর operating system, যে সবার মাঝখানে বসে সবকিছু সামলায়। আর শেষে compiler, interpreter আর JIT — যারা মানুষের ভাষাকে machine-এর ভাষায় অনুবাদ করে।')}
            {p('এই সিরিজ পড়ে আপনি নতুন CPU design করতে পারবেন না। সেটা উদ্দেশ্যও ছিল না। উদ্দেশ্য ছিল অন্য কিছু।')}
            {p('আমরা প্রতিদিন এমন সব tool ব্যবহার করি যাদের ভেতরের কিছুই জানি না। React লিখি, কিন্তু browser কীভাবে সেটা চালায় জানি না। Docker চালাই, কিন্তু container আসলে কী তা নিয়ে ভাবি না। এই না-জানাটা এক অর্থে ভালো — abstraction-এর পুরো উদ্দেশ্যই তো এটা। কিন্তু আরেক অর্থে এটা আমাদের অসহায় করে তোলে। কিছু ভাঙলে আমরা জানি না কোথায় খুঁজতে হবে।')}
            {p('এখন অন্তত একটা মানচিত্র আছে। App slow হলে বুঝবেন cache-এর কথা ভাবা যেতে পারে। Memory leak হলে জানবেন heap কী জিনিস। Deployment-এ 502 এলে অন্তত অনুমান করতে পারবেন কোন layer-এ সমস্যা।')}
            {p('সবচেয়ে বড় কথা, machine আর আগের মতো রহস্যময় থাকবে না। ঢাকনা খুলে ইঞ্জিনটা একবার দেখা হয়ে গেছে। ভেতরে কোনো জাদু নেই — আছে শুধু voltage, logic, আর কয়েক দশক ধরে মানুষের জমানো চতুর কিছু ধারণা।')}
            {p('সেটুকু জানাই যথেষ্ট।')}
            <p style={{ margin: '0 0 16px', fontFamily: "'Departure Mono',monospace", fontSize: 13, color: '#00753F' }}>পড়ার জন্য ধন্যবাদ। ভালো থাকবেন।</p>
          </div>
        ) : (
          <div style={body}>
            {p(<>Eight articles ago we started with a simple question — when you write {MONO('x = 5')}, where does that 5 go inside the computer?</>)}
            {p('Finding that answer took us a long way. From transistors to logic gates, gates to latches, latches to registers. Then binary encoding, the ALU and buses inside a CPU, the endless cycle of fetch-decode-execute. Then memory hierarchy, the cleverness of caches, the beauty of locality. Then the operating system, sitting between everyone and managing it all. And finally compilers, interpreters, and JIT — translating human language into machine language.')}
            {p("Reading this series won't let you design a new CPU. That was never the goal. The goal was something else.")}
            {p("Every day we use tools whose insides we know nothing about. We write React without knowing how the browser runs it. We run Docker without thinking about what a container actually is. That not-knowing is fine in one sense — the whole point of abstraction is exactly that. But in another sense it leaves us helpless. When something breaks, we don't know where to start looking.")}
            {p("Now at least there's a map. When an app is slow, you'll know caches are worth thinking about. When there's a memory leak, you'll know what a heap is. When a deployment returns 502, you'll at least be able to guess which layer has the problem.")}
            {p("Most of all, the machine won't feel as mysterious anymore. The hood has been opened once and the engine has been looked at. There's no magic inside — just voltage, logic, and a few decades' worth of clever ideas accumulated by people.")}
            {p('Knowing that much is enough.')}
            <p style={{ margin: '0 0 16px', fontFamily: "'Departure Mono',monospace", fontSize: 13, color: '#00753F' }}>Thank you for reading. Take care.</p>
          </div>
        )}
      </Section>

      <Section num="09" bnH2="আরও গভীরে যেতে চাইলে" enH2="If you want to go deeper">
        {bn ? (
          <div lang="bn" style={body}>
            {p('এই সিরিজ ছিল একটা পাখির চোখে দেখা। প্রতিটা topic-ই নিজে একটা পূর্ণ জগত। কোনো একটা layer যদি আপনার মন কেড়ে থাকে, নিচের resource-গুলো থেকে শুরু করতে পারেন। প্রায় সবগুলোই বিনামূল্যে পাওয়া যায়।')}
          </div>
        ) : (
          <div style={body}>
            {p("This series was a bird's-eye view. Each topic is a world of its own. If one of the layers caught your interest, here's where to start. Nearly all of these are free.")}
          </div>
        )}

        {READING.map((group) => (
          <div key={group.enGroup} style={{ margin: '0 0 20px' }}>
            <div
              style={{
                fontFamily: "'Departure Mono',monospace", fontSize: 11.5, color: '#00753F',
                letterSpacing: '0.08em', margin: '0 0 10px',
              }}
            >
              {bn ? group.bnGroup : group.enGroup}
            </div>
            <div style={{ borderLeft: '1px solid #c9bda0', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {group.items.map((r) => (
                <div key={r.name} {...(bn ? { lang: 'bn' } : {})} style={{ fontSize: 15.5, ...body }}>
                  <em style={{ fontStyle: 'normal', fontWeight: 700 }}>{r.name}</em>
                  {r.where && (
                    <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.8em', color: '#5c5442' }}> ({r.where})</span>
                  )}
                  {' — '}
                  {bn ? r.bn : r.en}
                </div>
              ))}
            </div>
          </div>
        ))}

        {bn ? (
          <div lang="bn" style={body}>
            {p('শেষ কথা — এই তালিকা দেখে অভিভূত হওয়ার কিছু নেই। সবগুলো পড়তে হবে না। যে একটা জিনিস আপনার কৌতূহল জাগিয়েছে, সেটা নিয়েই শুরু করুন। বাকিটা সময়মতো আসবে।')}
          </div>
        ) : (
          <div style={body}>
            {p("One last thing — don't be overwhelmed by this list. You don't need to read all of it. Start with the one thing that made you curious. The rest will come when it comes.")}
          </div>
        )}
      </Section>

      <RelayNav
        hub={{
          label: { bn: 'আগের পর্ব', en: 'previous leg' },
          title: bn ? '০৭ — কোড থেকে মেশিন কোড' : '07 — Code to Machine Code',
          href: '/writing/code-to-machine-code',
          variant: 'hub',
        }}
        next={{
          label: { bn: 'সিরিজ শেষ', en: 'series complete' },
          title: bn ? '↩ সিরিজ hub — আটটা পর্ব একসাথে' : '↩ Series hub — all eight legs',
          href: '/writing/tech-articles',
          variant: 'next',
        }}
        bridge={{
          bn: 'এখানেই সিরিজ শেষ। voltage থেকে শুরু করে আবার voltage-এ ফেরত — মাঝখানে transistor, gate, register, cache, process, compiler, আর একটা keystroke-এর পুরো যাত্রা। সবগুলো পর্ব একসাথে দেখতে চাইলে hub-এ ফিরে যান।',
          en: "That's the end of the series. From voltage back to voltage — with transistors, gates, registers, caches, processes, compilers, and one keystroke's full journey in between. Head back to the hub to see all eight legs together.",
        }}
      />
      <Colophon />
    </article>
  );
}
