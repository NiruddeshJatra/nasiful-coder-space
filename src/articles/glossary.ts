export interface GlossaryEntry {
  term: string;
  bn: string;
  en: string;
}

export const glossary: Record<string, GlossaryEntry> = {
  bit: {
    term: 'bit',
    bn: 'কম্পিউটারের তথ্যের ক্ষুদ্রতম একক — "binary digit" থেকে এসেছে। মান শুধু দুটো হতে পারে: ০ অথবা ১। ডিজিটাল সার্কিটে এরা দুটো ভিন্ন বৈদ্যুতিক অবস্থা — সাধারণত ০ মানে Off (নিম্ন ভোল্টেজ), ১ মানে On (উচ্চ ভোল্টেজ)।',
    en: 'The smallest unit of data in a computer — from "binary digit." It can hold only two values: 0 or 1. In a digital circuit these are two distinct electrical states — usually 0 is Off (low voltage), 1 is On (high voltage).',
  },
  voltage: {
    term: 'voltage',
    bn: 'Voltage মানে electrical "pressure" — দুইটা point-এর মাঝে energy-র পার্থক্য। যেভাবে পানির চাপ পানিকে pipe-এ ঠেলে, voltage electron-কে তারের মধ্য দিয়ে বয়ে নিয়ে যায়। যত বেশি voltage তত বেশি push। ভোল্ট-এ মাপা হয় (V)। কম্পিউটারে সাধারণত ০ থেকে ৫ ভোল্টের মধ্যে কাজ হয় (আধুনিক chip-এ ১.৮ ভোল্ট বা তার কম)।',
    en: 'Voltage is electrical "pressure" — the energy difference between two points. The way water pressure pushes water through a pipe, voltage carries electrons through a wire. More voltage, more push. Measured in volts (V). Computers usually work between 0 and 5 volts (modern chips at 1.8V or less).',
  },
  noisemargin: {
    term: 'noise margin',
    bn: 'Noise margin হলো binary signal-এর "safety zone" — high state (১) আর low state (০)-এর মাঝখানে একটা forbidden gap। এই gap এত বড় যে ছোটখাটো electrical noise signal-কে এক state থেকে অন্য state-এ ঠেলে দিতে পারে না। এই margin ছাড়া binary computing চলত না — প্রতি nanosecond-এ data corrupt হতো।',
    en: "The noise margin is a binary signal's \"safety zone\" — a forbidden gap between the high state (1) and the low state (0). The gap is large enough that small electrical noise cannot push the signal from one state into the other. Without this margin, binary computing wouldn't work — data would corrupt every nanosecond.",
  },
  serpar: {
    term: 'series / parallel',
    bn: 'Circuit-এ দুইটা component "series"-এ থাকা মানে তারা একই লাইনে যুক্ত — current-কে দুইটার মধ্য দিয়েই যেতে হবে। "Parallel"-এ মানে তারা পাশাপাশি জোড়া — current যেকোনো একটার মধ্য দিয়ে গেলেই হলো। Series মানে "দুইটাই লাগবে" (AND-এর মতো), parallel মানে "যেকোনো একটা চললেই হবে" (OR-এর মতো)।',
    en: 'Two components in "series" sit on the same line — current must pass through both. In "parallel" they sit side by side — current through either one is enough. Series means "both required" (like AND); parallel means "any one will do" (like OR).',
  },
  alu: {
    term: 'ALU',
    bn: 'ALU মানে Arithmetic Logic Unit — CPU-র সেই অংশ যেটা arithmetic (যোগ, বিয়োগ, গুণ, ভাগ) আর logical operations (AND, OR, comparison) করে। ALU সম্পূর্ণভাবে logic gate দিয়ে বানানো — কোনো "processor within processor" না, শুধু অনেকগুলো gate একসাথে সাজানো। যখন আপনি JavaScript-এ a + b লেখেন, শেষ পর্যন্ত সেই দুইটা সংখ্যা ALU-র মধ্য দিয়ে যায় আর যোগফল বের হয়।',
    en: 'ALU means Arithmetic Logic Unit — the part of the CPU that does arithmetic (add, subtract, multiply, divide) and logical operations (AND, OR, comparison). The ALU is built entirely from logic gates — no "processor within a processor," just many gates arranged together. When you write a + b in JavaScript, those two numbers eventually pass through the ALU and the sum comes out.',
  },
  latch: {
    term: 'latch',
    bn: 'Latch একটা circuit যা ১ bit information "hold" করে রাখতে পারে। এটা তৈরিতে দুইটা logic gate-কে cross-coupled ভাবে জোড়ানো হয় (একটার output অন্যটার input-এ), যার ফলে circuit-টা দুইটা stable state-এর যেকোনো একটায় settle হয় — ১ বা ০। এই stability-ই memory। Current যতক্ষণ থাকবে, state ততক্ষণ থাকবে।',
    en: "A latch is a circuit that can \"hold\" 1 bit of information. It's built by cross-coupling two logic gates (each one's output into the other's input), so the circuit settles into one of two stable states — 1 or 0. That stability IS memory. The state lasts as long as the current does.",
  },
  flipflop: {
    term: 'flip-flop',
    bn: 'Flip-flop হচ্ছে latch-এরই একটা variant, কিন্তু state পরিবর্তন হয় শুধু clock signal-এর edge-এ (rising বা falling)। এটা synchronization-এর জন্য জরুরি — CPU-র সব register একই clock-এ চলে, তাই সবকিছু একসাথে ঘটে। CPU-র প্রতিটা register-এ থাকে ৩২ বা ৬৪টা flip-flop, প্রতিটা ১ bit করে ধরে রাখতে পারে।',
    en: "A flip-flop is a variant of the latch, but its state changes only on a clock signal's edge (rising or falling). This is crucial for synchronization — all CPU registers run on the same clock, so everything happens together. Each CPU register holds 32 or 64 flip-flops, each keeping 1 bit.",
  },
  thread: {
    term: 'thread',
    bn: "Thread হলো একটা program-এর ভেতরে code execute করার সবচেয়ে ছোট unit। একটা program-কে factory ধরুন, thread হলো সেই factory-র একেকজন worker। একটা factory-তে multiple worker একসাথে কাজ করতে পারে (multithreading), কিন্তু তারা সবাই একই factory-র resource share করে। ধরা যাক, আপনি MS Word অ্যাপটি ওপেন করেছেন। এখানে পুরো MS Word অ্যাপ্লিকেশনটি হলো একটি Process। এই প্রসেসের ভেতরে ব্যাকগ্রাউন্ডে একসাথে অনেকগুলো কাজ চলে — প্রতিটি আলাদা কাজই একেকটি Thread। আপনি যখন টাইপ করছেন: • থ্রেড ১ (টাইপিং ও ডিসপ্লে) — প্রেস করা অক্ষরগুলো স্ক্রিনে ফুটিয়ে তোলে • থ্রেড ২ (বানান চেক) — ব্যাকগ্রাউন্ডে লাল দাগ দিয়ে ভুল বানান সনাক্ত করে • থ্রেড ৩ (অটো-সেভ) — প্রতি মিনিটে ফাইলটি স্বয়ংক্রিয়ভাবে সেভ করতে থাকে।",
    en: "A thread is the smallest unit of code execution inside a program. Think of a program as a factory; a thread is one worker in that factory. A factory can have multiple workers at once (multithreading), but they all share the factory's resources. Suppose you open MS Word — the whole application is a Process; the separate tasks running inside it are Threads. While you type: • Thread 1 (typing & display) renders your keystrokes on screen • Thread 2 (spell check) underlines misspellings in the background • Thread 3 (auto-save) saves your file every minute so you lose nothing.",
  },
  abstraction: {
    term: 'abstraction',
    bn: 'জটিল mechanism-কে একটা সহজ interface-এর পেছনে লুকিয়ে ফেলা। গাড়ির accelerator-এ চাপ দিলে গাড়ি চলে — engine-এর ভেতরে কী ঘটছে জানতে হয় না। Software-এ প্রতিটা layer-ই নিচের layer-এর abstraction: আপনার কোড → runtime → OS → hardware।',
    en: "Hiding complex machinery behind a simple interface. Press a car's accelerator and it moves — you don't need to know what the engine is doing. In software every layer is an abstraction of the one below: your code → runtime → OS → hardware.",
  },
  twoscomp: {
    term: "two's complement",
    bn: 'ডিজিটাল ইলেকট্রনিক্সে চিহ্নযুক্ত (পজিটিভ ও নেগেটিভ) পূর্ণসংখ্যা রিপ্রেজেন্ট করার সবচেয়ে জনপ্রিয় গাণিতিক পদ্ধতি। এতে কোনো সংখ্যার বিটগুলোকে ইনভার্ট করে ১ যোগ করে নেগেটিভ মান বের করা হয়। এর সবচেয়ে বড় সুবিধা হলো, এর ফলে সিস্টেমে কেবল একটিই শূন্য (0) থাকে এবং প্রসেসর একই হার্ডওয়্যার সার্কিট ব্যবহার করে যোগ ও বিয়োগ সম্পন্ন করতে পারে।',
    en: 'The mathematical standard used in digital electronics to represent signed (both positive and negative) integers. It is achieved by inverting the bits of a binary number and adding 1. Its primary advantage is that it eliminates the problem of a negative zero (−0) and allows the CPU to perform both addition and subtraction using the exact same hardware circuitry.',
  },
  ascii: {
    term: 'ASCII',
    bn: 'ASCII (American Standard Code for Information Interchange) — computing-এর সবচেয়ে পুরনো character encoding standard। প্রতিটা ইংরেজি অক্ষর, digit, punctuation-এর জন্য একটা করে ৭-bit code (মোট ১২৮টা possibility)। ১৯৬০-এর দশকে design করা হয়েছিল, তখন শুধু ইংরেজির জন্য বানানো ছিল। এখনো UTF-8-এর ভেতরে backward compatibility হিসেবে টিকে আছে।',
    en: 'ASCII (American Standard Code for Information Interchange) is computing’s oldest character encoding standard. A 7-bit code for every English letter, digit, and punctuation mark (128 possibilities total). Designed in the 1960s, made only for English at the time. Still lives inside UTF-8 today for backward compatibility.',
  },
  unicode: {
    term: 'Unicode',
    bn: 'Unicode একটা international standard যেটা পৃথিবীর প্রতিটা language-এর প্রতিটা character-এর জন্য একটা করে unique identity বা code point নির্ধারণ করে — যেমন ‘ক’-এর code point হলো U+0995। মনে রাখবেন, এটা identity assignment, encoding না। কীভাবে সেই identity actual bit-এ রূপান্তর হবে, সেটা encoding-এর কাজ (যেমন UTF-8 বা UTF-16)।',
    en: 'Unicode is an international standard that assigns a unique identity (code point) to every character in every language on Earth — like U+0995 for ‘ক’. Remember, this is identity assignment, not encoding. How that identity turns into actual bits is the job of encoding schemes like UTF-8 or UTF-16.',
  },
  utf8: {
    term: 'UTF-8',
    bn: 'UTF-8 হলো Unicode-এর সবচেয়ে জনপ্রিয় encoding। এটা variable-width — সহজ character-এর জন্য কম bit, জটিলের জন্য বেশি। ইংরেজি অক্ষরের জন্য ১ byte, বাংলা character-এর জন্য ৩ byte, complex emoji-র জন্য ৪ byte পর্যন্ত। ASCII-র সাথে সম্পূর্ণ backward compatible — যেকোনো valid ASCII file automatically একটা valid UTF-8 file।',
    en: 'UTF-8 is the most popular Unicode encoding. Variable-width — fewer bits for simple characters, more for complex ones. 1 byte for English letters, 3 bytes for Bangla characters, up to 4 bytes for complex emoji. Fully backward-compatible with ASCII — any valid ASCII file is automatically a valid UTF-8 file.',
  },
  endian: {
    term: 'endianness',
    bn: 'যখন কোনো ডেটা ১ byte-এর চেয়ে বড় হয় (যেমন ৩ byte-এর বাংলা অক্ষর বা ৩২-bit integer), তখন সেই মাল্টি-byte ডেটা মেমোরিতে কোন ক্রমানুসারে (byte order) সংরক্ষিত হবে, তা নির্ধারণ করার পদ্ধতি। Big-Endian: সবচেয়ে গুরুত্বপূর্ণ byte (MSB) মেমোরির প্রথম এড্রেসে বসে (স্বাভাবিক মানুষের পড়ার মতো)। Little-Endian: সবচেয়ে কম গুরুত্বপূর্ণ byte (LSB) আগে বসে। আধুনিক x86 এবং ARM প্রসেসরগুলো সাধারণত Little-Endian ব্যবহার করে।',
    en: 'The system configuration that dictates the byte order used to store multi-byte data (like a 3-byte Bangla character or a 32-bit integer) in memory. Big-Endian stores the most significant byte (MSB) at the lowest address (how humans naturally read numbers). Little-Endian stores the least significant byte (LSB) first. Modern x86 and ARM CPUs predominantly use Little-Endian.',
  },
  sampling: {
    term: 'sampling',
    bn: 'Sampling হলো continuous জিনিস (যেমন sound wave, temperature reading) থেকে regular interval-এ measurement নিয়ে সেটাকে discrete সংখ্যায় রূপান্তরের process। যেমন একটা video camera প্রতি সেকেন্ডে অনেকগুলো ছবি তুলে সেগুলোকে জোড়া দিয়ে চলমান video বানায় — sampling ঠিক তেমনই একটা wave থেকে অনেকগুলো "snapshot" নিয়ে সেটাকে digital data-য় রূপ দেয়।',
    en: 'Sampling is the process of turning something continuous (like a sound wave or a temperature reading) into discrete numbers by taking measurements at regular intervals. Like a video camera taking many still pictures per second and stringing them together as a moving video — sampling takes many "snapshots" of a wave to turn it into digital data.',
  },
  lossless: {
    term: 'lossless compression',
    bn: 'Lossless compression মানে data-কে ছোট করা, কিন্তু কিছুই না হারিয়ে। Compress করার পর যেকোনো সময় সম্পূর্ণ original ফিরে পাওয়া যায়। ট্রিকটা হলো — repetition আর pattern খুঁজে বের করে সেগুলোকে সংক্ষেপে লেখা। Gzip, Brotli, PNG — এসব lossless। Text, code, database backup-এর জন্য mandatory।',
    en: 'Lossless compression shrinks data without losing anything. Decompress at any time and you get the exact original back. The trick is finding repetition and patterns in the data and writing them more concisely. Gzip, Brotli, PNG — all lossless. Mandatory for text, code, database backups.',
  },
  propdelay: {
    term: 'propagation delay',
    bn: 'Propagation delay হলো একটা signal-এর circuit-এর এক প্রান্ত থেকে আরেক প্রান্তে পৌঁছাতে যে সময় লাগে। প্রতিটা gate পার হতে signal-এর কয়েক picosecond লাগে — ৬৪টা full adder সিরিজে থাকলে সেই বিলম্ব জমে বড় হয়ে যায়। Clock-এর একটা tick-এর মধ্যে signal পুরো পথ পাড়ি দিতে না পারলে হিসাব ভুল হয়ে যায়।',
    en: "Propagation delay is the time a signal takes to travel from one end of a circuit to the other. Each gate adds a few picoseconds — chain 64 full adders in series and those delays accumulate. If the signal can't finish the trip within one clock tick, the calculation comes out wrong.",
  },
  pc: {
    term: 'Program Counter',
    bn: 'প্রোগ্রাম কাউন্টার (PC) হলো CPU-র ভেতরের একটি বিশেষায়িত রেজিস্টার, যা মেমোরিতে থাকা পরবর্তী instruction-এর সুনির্দিষ্ট address ধরে রাখে। প্রতিবার একটি instruction মেমোরি থেকে তুলে আনার সাথে সাথেই PC স্বয়ংক্রিয়ভাবে এক ধাপ বেড়ে পরবর্তী লাইনের ঠিকানা লক করে ফেলে। কোডে কোনো loop বা if-statement থাকলে এই PC-র ভেতরের address-টি জাম্প করে বদলে যায় — যা সফটওয়্যারকে সিদ্ধান্ত নেওয়ার ক্ষমতা দেয়।',
    en: 'The Program Counter (PC) is a dedicated register inside the CPU that holds the specific memory address of the next instruction waiting to be executed. As soon as the current instruction is fetched from RAM, the PC automatically increments to point to the next address. When control flow like loops or conditionals occur in code, the PC’s address is forcefully overwritten to cause a branch — enabling software logic decisions.',
  },
  ir: {
    term: 'Instruction Register',
    bn: 'ইন্সট্রাকশন রেজিস্টার (IR) হলো CPU-র ভেতরে অবস্থিত একটি অস্থায়ী হোল্ডিং জোন বা বাফার। মেমোরি (RAM) থেকে fetch করে আনা instruction-এর র-ভোল্টেজ bit-গুলো সরাসরি এই IR-এ এসে জমা হয়, এবং যতক্ষণ না সেই instruction-এর execution সম্পূর্ণ শেষ হচ্ছে, ততক্ষণ bit-গুলো এখানেই স্থির থাকে — যেন Control Unit নিখুঁতভাবে তা read করতে পারে।',
    en: 'The Instruction Register (IR) is a dedicated internal hardware buffer within the CPU control path. Raw voltage bits fetched directly from system memory (RAM) are stored in the IR, where they are held completely static until the execution phase is fully completed. This guarantees that the execution logic and control unit have stable, unaltered access to the active instruction bits.',
  },
  cu: {
    term: 'Control Unit',
    bn: 'কন্ট্রোল ইউনিট (CU) হলো প্রসেসরের ভেতরের মূল ডিরেক্টর বা অর্কেস্ট্রা কন্ডাক্টর। এটি নিজে কোনো গাণিতিক হিসাব করে না বা ডেটা জমা রাখে না; এর কাজ হলো ইন্সট্রাকশন রেজিস্টার (IR) থেকে opcode পড়া এবং ডিকোডার সার্কিটের মাধ্যমে পুরো চিপের নিয়ন্ত্রণ তারগুলোতে (control wires) ভোল্টেজ পাঠানো। এটিই নির্ধারণ করে কখন ALU অন হবে, কখন বাস দিয়ে ডেটা ছুটবে এবং কোন register-এর দরজা খুলবে।',
    en: 'The Control Unit (CU) serves as the primary director or orchestrator of the entire processor. It contains no arithmetic circuitry and stores no program data; instead, it reads the operational bits from the Instruction Register (IR) and routes them through a decoder network. This hardware logic translates the raw instruction into specific electrical control lines — signaling when the ALU should switch modes, when the data bus should open, or which registers should latch new values.',
  },
  opcode: {
    term: 'Opcode',
    bn: 'Opcode (Operation Code) হলো একটি বাইনারি instruction-এর একদম শুরুর নির্দিষ্ট কিছু bit (যেমন ১ম ৪ বা ৮ bit), যা মূল অপারেশনের ধরন নির্দেশ করে। এটি CPU-র ভেতরের কন্ট্রোল সার্কিটের জন্য একটি ignition key-র মতো কাজ করে — এই bit প্যাটার্ন দেখেই প্রসেসরের হার্ডওয়্যার বুঝতে পারে তাকে যোগ (ADD), বিয়োগ (SUB), নাকি মেমোরি থেকে ডেটা load (LOAD) করতে হবে।',
    en: 'The Opcode (Operation Code) comprises the initial, fixed-length bit fields (such as the first 4 or 8 bits) of a raw binary instruction that specify the nature of the execution task. It acts as an ignition key for the internal control unit logic; by matching this specific bit pattern, the processor hardware immediately knows whether it must perform arithmetic (ADD/SUB), move data internally, or fetch data from memory (LOAD).',
  },
  lossy: {
    term: 'lossy compression',
    bn: 'Lossy compression মানে সাইজ কমানোর জন্য কিছু data চিরতরে বাদ দেওয়া — কিন্তু এমনভাবে যাতে মানুষের চোখ বা কান পার্থক্য ধরতে না পারে। MP3, JPEG, H.264 — এগুলো সব lossy। মানুষের perception-এর সীমাবদ্ধতা কাজে লাগিয়ে অসাধারণ compression ratio পাওয়া যায়। কিন্তু original data চিরতরে হারিয়ে যায় — decompress করলে exactly একই file আর ফিরে পাওয়া যায় না।',
    en: 'Lossy compression shrinks by permanently discarding some data — but in ways human eyes and ears can’t detect. MP3, JPEG, H.264 — all lossy. Exploiting the limits of human perception gets you incredible compression ratios. But the original data is gone forever — decompressing doesn’t give you back an exact copy.',
  },
  cacheline: {
    term: 'cache line',
    bn: 'Cache line হলো ডেটার সেই মৌলিক unit যেটা CPU একবারে memory থেকে cache-এ আনে। সাধারণত 64 byte। মানে CPU কখনো ১ byte আনে না — যে address চাচ্ছে, তার আশেপাশের 64 byte পুরোটা একসাথে টেনে নেয়। Spatial locality কাজ করে এই কারণেই — কাছের ডেটা automatically চলে আসে।',
    en: 'A cache line is the fundamental, 64-byte aligned unit of data transfer between main memory (DRAM) and the processor cache layers. Whenever a CPU requests a single byte from RAM, the memory controller reads and commits the entire containing 64-byte block into cache — spatial locality works precisely because of this.',
  },
  locality: {
    term: 'locality',
    bn: 'Locality মানে program-এর memory access random না, বরং একটা predictable pattern মেনে চলে। দুই রকম — Temporal locality: এই মুহূর্তে যা access হচ্ছে, একটু পরে আবার access হওয়ার সম্ভাবনা বেশি (loop counter-এর মতো)। Spatial locality: যে address এখন লাগছে, তার আশপাশের address-ও শীঘ্রই লাগবে (array traverse করার মতো)। পুরো cache hierarchy locality-র ওপরই দাঁড়িয়ে আছে।',
    en: "Locality means a program's memory access isn't random — it follows a predictable pattern. Two kinds: Temporal locality — data accessed right now is likely to be accessed again soon (like a loop counter). Spatial locality — an address accessed now means its neighbors will likely be needed soon too (like traversing an array). The entire cache hierarchy exists because of locality.",
  },
  cachecoherence: {
    term: 'cache coherence',
    bn: 'Multi-core CPU-তে প্রতিটা core-এর নিজস্ব L1/L2 cache থাকে। একটা core কোনো variable বদলালে, অন্য core-এর cache-এ থাকা পুরনো copy-টা stale হয়ে যায়। Cache coherence protocol (যেমন MESI — Modified, Exclusive, Shared, Invalid) এই সমস্যা সমাধান করে — কোনো core কিছু বদলালে, বাকি core-দের cache-এ থাকা সেই line-কে "Invalid" ঘোষণা করে দেয়, যাতে কেউ পুরনো ডেটা না পড়ে।',
    en: 'In a multi-core CPU, each core has its own private L1/L2 cache. If one core modifies a variable, the copy sitting in another core\'s cache goes stale. Cache coherence protocols (like MESI — Modified, Exclusive, Shared, Invalid) solve this — when a core writes, it broadcasts an invalidation signal that marks the matching line "Invalid" in every other core\'s cache, so nobody reads stale data.',
  },
};
