import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Deeper } from '../primitives/Deeper';
import { Recap } from '../primitives/Recap';
import { RelayNav } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { useProse, LINK, WELL, mono as MONO } from '../primitives/useProse';
import { TwoStrategies } from '../widgets/TwoStrategies';
import { MiddleLayer } from '../widgets/MiddleLayer';
import { HotPath } from '../widgets/HotPath';
import { CompilePipeline } from '../widgets/CompilePipeline';

export function CodeToMachineCode() {
  const { bn, body, p, lead, ul, box, shell } = useProse();

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={body}>
            {p('আপনি লিখলেন:')}
          </div>
        ) : (
          <div style={body}>
            {p('You wrote:')}
          </div>
        )}

        {/* hello.js snippet */}
        <div style={{ margin: '0 0 20px', background: '#1b231b', border: '1px solid #4a493a', overflow: 'hidden', boxShadow: '0 10px 28px rgba(20,18,10,0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: '#232b23', borderBottom: '1px solid #2e392e' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff6b6b', display: 'block' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#e0c264', display: 'block' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#00d26a', display: 'block' }} />
            <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11, color: '#8aa893', marginLeft: 8 }}>hello.js</span>
          </div>
          <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12.5, lineHeight: 1.9, padding: '12px 18px', color: '#cfe8d8', whiteSpace: 'pre', overflowX: 'auto' }}>
            <span style={{ color: '#7fae94' }}>const</span> x = <span style={{ color: '#d8c88a' }}>5</span> + <span style={{ color: '#d8c88a' }}>3</span>;{'\n'}
            console.<span style={{ color: '#9fd8b8' }}>log</span>(x);
          </div>
        </div>

        {bn ? (
          <div lang="bn" style={body}>
            {p(<>Node চালালেন। Screen-এ {MONO('8')} দেখলেন।</>)}
            {p(<>কিন্তু আগের আর্টিকেলগুলোতে দেখেছি — CPU JavaScript বোঝে না। CPU শুধু machine code বোঝে, সেই hex numbers যা <a href="/writing/heartbeat-fde" style={LINK}>Article 4</a>-এ দেখেছিলাম:</>)}
            <div style={WELL}>89 E5 83 EC 10 C7 45 FC ...</div>
            {p('তাহলে মাঝখানে কী ঘটল? আপনার লেখা text কীভাবে CPU-র জন্য executable instruction হয়ে গেল?')}
            {p('এটাই আজকের গল্প।')}
            {box('// একটা কথা আগে বলে রাখি', <>
              <p style={{ margin: '0 0 12px', ...body }}>এই সিরিজে এতদিন <a href="/writing/cpu-blueprint" style={LINK}>hardware</a> আর <a href="/writing/os-grand-conductor" style={LINK}>OS</a> দেখা হয়েছে। এই আর্টিকেল-এ software-এর একটা special layer দেখব — যেটা "translator" হিসেবে কাজ করে।</p>
              <p style={{ margin: '0 0 12px', ...body }}>মূল প্রশ্ন সহজ: মানুষ যা লেখে (JavaScript, Python, C) আর CPU যা বোঝে (machine code) — এই দুইটার মাঝে অনুবাদ কে করে?</p>
              <p style={{ margin: 0, ...body }}>আজকে সেই অনুবাদকদের গল্প।</p>
            </>)}
          </div>
        ) : (
          <div style={body}>
            {p(<>Ran Node. Saw {MONO('8')} on screen.</>)}
            {p(<>But we've seen in earlier articles — the CPU doesn't understand JavaScript. The CPU only understands machine code, those hex numbers from <a href="/writing/heartbeat-fde" style={LINK}>Article 4</a>:</>)}
            <div style={WELL}>89 E5 83 EC 10 C7 45 FC ...</div>
            {p('So what happened in between? How did the text you wrote become executable CPU instructions?')}
            {p("That's today's story.")}
            {box('// one thing to clear up first', <>
              <p style={{ margin: '0 0 12px', ...body }}>This series has covered <a href="/writing/cpu-blueprint" style={LINK}>hardware</a> and the <a href="/writing/os-grand-conductor" style={LINK}>OS</a> so far. In this article we look at a special layer of software — one that works as a translator.</p>
              <p style={{ margin: '0 0 12px', ...body }}>The core question is simple: what people write (JavaScript, Python, C) and what the CPU understands (machine code) — who does the translation between them?</p>
              <p style={{ margin: 0, ...body }}>Today, the story of those translators.</p>
            </>)}
          </div>
        )}
      </div>

      <Section num="01" bnH2="প্রথম কথা: একজন অনুবাদক লাগবেই" enH2="First thing: you always need a translator">
        {bn ? (
          <div lang="bn" style={body}>
            {p('একটা foreign language বই পড়তে চাইলে একজন অনুবাদক লাগে। Computer-এর ক্ষেত্রেও তেমনই। যেকোনো high-level language (JavaScript, Python, Go) থেকে CPU-র machine code পর্যন্ত পৌঁছাতে একটা translator software লাগবে। এই translator নিজেও একটা program, যেটা CPU-তে চলে।')}
            {p('কিন্তু translator-দের কাজের ধরন আলাদা। কেউ পুরো বইটা আগে থেকে অনুবাদ করে ছাপিয়ে দেয়। কেউ বাক্য পড়ে পড়ে on-the-spot বলে দেয়। কেউ আবার প্রথমে একটা middle language-এ নামায়, তারপর সেটা কেউ পড়ে।')}
            {lead(<>এই ভিন্ন approach-গুলোর মধ্যে মূল কয়েকটা:</>)}
            {ul([
              <><strong><Term id="compiler">Compiler</Term>:</strong> পুরো code আগে থেকে একবারে অনুবাদ করে (C, Go, Rust)।</>,
              <><strong><Term id="interpreter">Interpreter</Term>:</strong> লাইন ধরে ধরে on-the-fly অনুবাদ করে (আদি Python, Bash)।</>,
              <><strong><Term id="bytecode">Bytecode</Term> + VM:</strong> প্রথমে একটা intermediate language-এ নামানো হয়, তারপর সেটা interpret হয় (Java, Python, C#)।</>,
              <><strong><Term id="jit">JIT</Term> (Just-In-Time):</strong> hybrid + smart — runtime-এ কোন কোন অংশ ঘন ঘন চালানো হচ্ছে সেটা লক্ষ্য করে, সেগুলোকে সরাসরি machine code-এ compile করে ফেলে (JavaScript's V8, JVM's HotSpot)।</>,
            ])}
            {p('একটা একটা করে দেখা যাক।')}
          </div>
        ) : (
          <div style={body}>
            {p('To read a book in a foreign language, you need a translator. Same for computers. Getting from any high-level language (JavaScript, Python, Go) down to the CPU\'s machine code requires translator software. That translator is itself a program, running on the CPU.')}
            {p('But translators work in different ways. Some translate the entire book ahead of time and print it. Some read sentence by sentence and speak it out on the spot. Some first bring it down to a middle language, and then someone else reads that.')}
            {lead(<>The main approaches:</>)}
            {ul([
              <><strong><Term id="compiler">Compiler</Term>:</strong> Translates the entire code ahead of time, all at once (C, Go, Rust).</>,
              <><strong><Term id="interpreter">Interpreter</Term>:</strong> Translates line by line on the fly (early Python, Bash).</>,
              <><strong><Term id="bytecode">Bytecode</Term> + VM:</strong> First comes down to an intermediate language, then that gets interpreted (Java, Python, C#).</>,
              <><strong><Term id="jit">JIT</Term> (Just-In-Time):</strong> Hybrid and smart — watches which parts run frequently at runtime, then compiles those directly to machine code (JavaScript's V8, JVM's HotSpot).</>,
            ])}
            {p("Let's take them one at a time.")}
          </div>
        )}
      </Section>

      <Section num="02" bnH2="Compiler: আগে থেকে অনুবাদক" enH2="Compiler: the ahead-of-time translator">
        {bn ? (
          <div lang="bn" style={body}>
            {p(<>Compiler এমন একটা program যেটা আপনার লেখা source code পুরোটা একবারে পড়ে, বুঝে, এবং machine code-এ রূপান্তরিত করে। এই process-এর নাম <strong>compilation</strong>।</>)}
            {p('কল্পনা করুন একজন professional book translator। সে পুরো বাংলা বই পড়ে, পুরোটা ইংরেজিতে অনুবাদ করে, ছাপিয়ে বাজারে দিয়ে দেয়। এরপর যে-ই পড়তে চায়, সে ইংরেজি version পড়বে — বাংলা original আর অনুবাদক দুইজনের কারো আর দরকার নেই।')}
            {p(<>Compiler-এর কাজও একই। আপনি C-তে লিখলেন {MONO('hello.c')}। Compiler run করলেন:</>)}
            {shell('gcc hello.c -o hello')}
            {p(<>Compiler {MONO('hello.c')} পড়ল, বুঝল, machine code তৈরি করল, {MONO('hello')} নামে একটা executable file তৈরি করে দিল। এখন {MONO('./hello')} চালান — compiler-এর আর দরকার নেই। CPU সরাসরি machine code চালাচ্ছে।</>)}
            <p style={{ margin: '0 0 6px', ...body }}><strong>সুবিধা:</strong></p>
            {ul([
              <>একবার compile হয়ে গেলে, প্রতিবার চালানোর সময় আর অনুবাদ করতে হয় না। <strong>তাই খুব দ্রুত।</strong></>,
              'Compile করার সময় compiler পুরো code দেখে, তাই optimize করার অনেক সুযোগ পায়।',
              'Compiled binary distribute করা যায় source code ছাড়াই।',
            ])}
            <p style={{ margin: '0 0 6px', ...body }}><strong>অসুবিধা:</strong></p>
            {ul([
              'Small change করলেও পুরো code আবার compile করতে হয়।',
              'এক platform-এ compile করা code অন্য platform-এ চলে না (Windows binary Linux-এ চলবে না)।',
              'Compile করার আগে code-এ syntax error থাকলে ধরা পড়ে, কিন্তু runtime error তখনও ধরা যাবে না।',
            ])}
            {p('C, Go, Rust — এদের কেউ interpreter-এর সাথে চলে না। আপনি compile করে binary বানাবেন, তারপরই চালাতে পারবেন।')}
          </div>
        ) : (
          <div style={body}>
            {p(<>A compiler is a program that reads your entire source code, understands it, and converts it into machine code. That process is called <strong>compilation</strong>.</>)}
            {p('Picture a professional book translator. They read the whole Bangla book, translate the whole thing into English, print it, and send it to bookstores. From then on, anyone who wants to read it reads the English version — neither the original nor the translator is needed anymore.')}
            {p(<>A compiler works the same way. You write {MONO('hello.c')} in C. You run the compiler:</>)}
            {shell('gcc hello.c -o hello')}
            {p(<>The compiler reads {MONO('hello.c')}, understands it, produces machine code, and creates an executable file named {MONO('hello')}. Now run {MONO('./hello')} — the compiler isn't needed anymore. The CPU is running machine code directly.</>)}
            <p style={{ margin: '0 0 6px', ...body }}><strong>Advantages:</strong></p>
            {ul([
              <>Once compiled, no translation happens at run time. <strong>So it's very fast.</strong></>,
              'The compiler sees the whole program during compilation, giving it many opportunities to optimize.',
              'Compiled binaries can be distributed without shipping the source code.',
            ])}
            <p style={{ margin: '0 0 6px', ...body }}><strong>Disadvantages:</strong></p>
            {ul([
              'Any small change means recompiling the whole thing.',
              "Code compiled for one platform won't run on another (a Windows binary won't run on Linux).",
              "Syntax errors get caught at compile time, but runtime errors still won't be found until it runs.",
            ])}
            {p('C, Go, Rust — none of these run through an interpreter. You compile to a binary first, then you can run it.')}
          </div>
        )}
      </Section>

      <Section num="03" bnH2="Interpreter: On-the-fly অনুবাদক" enH2="Interpreter: the on-the-fly translator">
        {bn ? (
          <div lang="bn" style={body}>
            {p('Interpreter সম্পূর্ণ ভিন্ন approach নেয়। এটা compile-এর মতো "আগে থেকে সব অনুবাদ" করে না। বরং, code চালানোর সময়, লাইন ধরে ধরে অনুবাদ করে execute করে।')}
            {p('কল্পনা করুন UN meeting-এর live translator। একজন যা বলছেন, translator সাথে সাথে অনুবাদ করে বলছেন। বই আকারে কিছু ছাপা হচ্ছে না — real-time-এই কাজ চলছে।')}
            {p(<>Interpreter-এর কাজ ঠিক একই। আপনি Python-এ {MONO('hello.py')} লিখলেন। চালালেন:</>)}
            {shell('python hello.py')}
            {p(<>Python interpreter {MONO('hello.py')} file open করল, প্রথম line পড়ল, execute করল, দ্বিতীয় line পড়ল, execute করল — এভাবে line by line চলতে থাকল। কোনো binary file তৈরি হলো না। Interpreter ছাড়া code চলবে না।</>)}
            <p style={{ margin: '0 0 6px', ...body }}><strong>সুবিধা:</strong></p>
            {ul([
              'Immediate feedback। Code লেখা মাত্রই চালানো যায়, compile step নেই।',
              'Platform-independent। যেকোনো OS-এ Python installed থাকলেই code চলবে।',
              'Dynamic behavior সহজ — runtime-এ code generate করে চালানো, reflection, ইত্যাদি।',
            ])}
            <p style={{ margin: '0 0 6px', ...body }}><strong>অসুবিধা:</strong></p>
            {ul([
              <>Compile-এর মতো optimization পাওয়া যায় না। <strong>তাই ধীর।</strong></>,
              'Interpreter সবসময় user-এর কাছে থাকতে হবে। শুধু code পাঠালে চলবে না, target machine-এ Python installed থাকতে হবে।',
              'Loop যদি ১০০০ বার চলে, একই লাইন interpreter ১০০০ বার পড়ে অনুবাদ করে — অনেক redundant work।',
            ])}
            {p('নিচের যন্ত্রে একই ছোট program দুই কৌশলে চালিয়ে দেখুন — compiler একবার অনুবাদ করে, interpreter প্রতিবার:')}
          </div>
        ) : (
          <div style={body}>
            {p("An interpreter takes a completely different approach. It doesn't translate everything ahead of time. Instead, while running the code, it translates and executes line by line.")}
            {p('Picture a live translator at a UN meeting. As someone speaks, the translator immediately renders it in another language. Nothing gets printed as a book — it all happens in real time.')}
            {p(<>An interpreter works the same way. You write {MONO('hello.py')} in Python. You run it:</>)}
            {shell('python hello.py')}
            {p(<>The Python interpreter opens {MONO('hello.py')}, reads the first line, executes it, reads the second line, executes it — and keeps going line by line. No binary file gets created. Without the interpreter, the code can't run.</>)}
            <p style={{ margin: '0 0 6px', ...body }}><strong>Advantages:</strong></p>
            {ul([
              'Immediate feedback. Write code, run it right away, no compile step.',
              'Platform independent. Code runs on any OS that has Python installed.',
              'Dynamic behavior is easy — generating and running code at runtime, reflection, and so on.',
            ])}
            <p style={{ margin: '0 0 6px', ...body }}><strong>Disadvantages:</strong></p>
            {ul([
              <>Doesn't get the optimizations a compiler can do. <strong>So it's slower.</strong></>,
              "The interpreter has to be present on the user's machine. Shipping just the code isn't enough; the target machine needs Python installed.",
              'If a loop runs 1000 times, the interpreter reads and translates the same lines 1000 times — a lot of redundant work.',
            ])}
            {p('Run the same little program under both strategies below — the compiler translates once, the interpreter every time:')}
          </div>
        )}
        <TwoStrategies />
      </Section>

      <Section num="04" bnH2="দুটোর মাঝামাঝি: Bytecode + Virtual Machine" enH2="The middle ground: Bytecode + Virtual Machine">
        {bn ? (
          <div lang="bn" style={body}>
            {p('Compile-এর speed আছে কিন্তু flexibility নেই। Interpret-এর flexibility আছে কিন্তু speed নেই। যদি দুইটার সুবিধা একসাথে পেতে চান, কী করবেন?')}
            {p(<>এই সমস্যার সমাধান হিসেবে এসেছে একটা hybrid approach। Source code সরাসরি machine code-এ না গিয়ে, একটা <strong>intermediate representation</strong>-এ নেমে আসে — যাকে বলে <Term id="bytecode">bytecode</Term>। এই bytecode CPU-র জন্য নয়, একটা <Term id="vm">virtual machine (VM)</Term>-এর জন্য designed। VM নিজে একটা program, যেটা এই bytecode interpret করে।</>)}
            {p('কল্পনা করুন — বাংলা বই ইংরেজিতে অনুবাদ করার বদলে Esperanto-তে নামানো হলো (একটা কল্পিত universal language)। পৃথিবীর যেকোনো ভাষার লোক Esperanto-জানা একটা reader নিয়ে এলেই সে সেটা পড়তে পারবে।')}
            {p(<>Java-র বিখ্যাত slogan মনে আছে? "Write once, run anywhere।" এটা exactly এই idea। Java code → bytecode ({MONO('.class')} file) → JVM (Java Virtual Machine) সেই bytecode interpret করে। JVM যেকোনো platform-এ install করা যায়, তাই একই bytecode Windows, Linux, Mac-এ চলে।</>)}
            {p(<>Python-ও একই approach নেয়। আমি অনেক দিন Python-কে pure interpreted ভাষা মনে করতাম। যতদিন না একদিন project folder-এ {MONO('__pycache__')} folder দেখলাম — ভেতরে অনেকগুলো {MONO('.pyc')} file। ভাবলাম, "এগুলো কী?" খুঁজে বার করলাম — Python actually source code-কে প্রথমে bytecode-এ compile করে, তারপর সেই bytecode-কে VM-এর মতো interpret করে। মানে Python কড়া অর্থে interpreted না, hybrid।</>)}
            {p('তাহলে Python কি compiled না interpreted? উত্তর — দুইটাই। Modern language-এ এই পার্থক্যটা আর তেমন meaningful না।')}
            {p('নিচের যন্ত্রে source থেকে bytecode থেকে VM — মাঝের স্তরটা এক ধাপ এক ধাপ করে দেখুন:')}
          </div>
        ) : (
          <div style={body}>
            {p('Compilation gives speed but not flexibility. Interpretation gives flexibility but not speed. What if you want both?')}
            {p(<>The solution is a hybrid approach. Instead of going directly from source code to machine code, the code comes down to an <strong>intermediate representation</strong> — called <Term id="bytecode">bytecode</Term>. This bytecode isn't for the CPU; it's designed for a <Term id="vm">virtual machine (VM)</Term>. The VM is itself a program that interprets this bytecode.</>)}
            {p('Picture this — instead of translating the Bangla book into English, you translate it into Esperanto (a made-up universal language). Now anyone in the world can read it, as long as they bring a reader who knows Esperanto.')}
            {p(<>Remember Java's famous slogan? "Write once, run anywhere." That's exactly this idea. Java code → bytecode ({MONO('.class')} files) → the JVM (Java Virtual Machine) interprets that bytecode. The JVM can be installed on any platform, so the same bytecode runs on Windows, Linux, and Mac.</>)}
            {p(<>Python takes the same approach. For a long time I thought Python was a purely interpreted language. Then one day I noticed a {MONO('__pycache__')} folder in a project directory, full of {MONO('.pyc')} files. "What are these?" I looked it up — Python actually compiles source code to bytecode first, then interprets that bytecode in a VM. Which means Python isn't strictly interpreted; it's a hybrid.</>)}
            {p("So is Python compiled or interpreted? The answer — both. In modern languages, that distinction isn't very meaningful anymore.")}
            {p('Step through the middle layer below — source to bytecode to VM:')}
          </div>
        )}
        <MiddleLayer />
      </Section>

      <Section num="05" bnH2="JIT: যে Interpreter শিখে যায়" enH2="JIT: the interpreter that learns">
        {bn ? (
          <div lang="bn" style={body}>
            {p('Bytecode + VM approach ভালো, কিন্তু execution তবু interpreter-এর মতো ধীর। কারণ VM প্রতিটা bytecode instruction পড়ে বুঝে execute করে। C-র মতো native speed পাওয়া যায় না।')}
            {p(<>এখানেই আসে সবচেয়ে চতুর approach — <strong><Term id="jit">JIT</Term> (Just-In-Time compilation)</strong>।</>)}
            {p('JIT একটা smart interpreter। প্রথমে সে interpreter-এর মতোই চলে — bytecode পড়ে execute করে। কিন্তু একই সাথে monitor করে — কোন কোন function বা loop বেশি বেশি চালানো হচ্ছে। যেগুলো "hot" (ঘন ঘন execute হচ্ছে), সেগুলোকে সে runtime-এ compile করে ফেলে native machine code-এ। পরের বার সেই function/loop চলার সময় interpret করে না — সরাসরি সেই compiled version চালায়।')}
            {p('কল্পনা করুন — একজন live translator শুরুতে সব বাক্য অনুবাদ করছে। কিন্তু কয়েকটা phrase বারবার আসছে ("Ladies and gentlemen", "As I was saying")। ১০ বার শোনার পর সে সেই phrase-এর অনুবাদ মুখস্থ করে ফেলল। এখন সেই phrase শুনলেই সে reflex-এ instant অনুবাদ বলে দেয় — চিন্তা করে না। JIT-এর কাজ ঠিক এভাবেই।')}
            {p('আধুনিক JavaScript-এর incredible speed-এর কারণ এই JIT। V8 (Chrome আর Node-এর engine) shockingly optimized — hot code paths native machine code-এ compile করে C-র কাছাকাছি speed দেয়। JVM-এর HotSpot compiler-এর নাম-ই বলে দিচ্ছে কী কাজ করে।')}
            {p('Trade-off আছে — JIT compilation নিজেই সময় খায়। তাই startup সাধারণত ধীর (interpreter mode-এ শুরু হয়)। কিন্তু long-running code দ্রুততর হতে থাকে।')}
            {p(<>নিচের যন্ত্রে loop চালান — দেখুন কখন {MONO('square()')} "hot" হয়ে JIT-compiled native-এ পরিণত হয়:</>)}
          </div>
        ) : (
          <div style={body}>
            {p("The bytecode + VM approach is good, but execution is still interpreter-slow. Because the VM reads, understands, and executes each bytecode instruction one at a time. You don't get native speed like C.")}
            {p(<>This is where the cleverest approach comes in — <strong><Term id="jit">JIT</Term> (Just-In-Time compilation)</strong>.</>)}
            {p('JIT is a smart interpreter. It starts out running like an interpreter — reading and executing bytecode. But at the same time, it monitors which functions or loops are being run frequently. The ones that are "hot" (executed over and over), it compiles at runtime into native machine code. The next time that function or loop runs, it doesn\'t get interpreted — the compiled version runs directly.')}
            {p('Picture this — a live translator starts out translating every sentence. But some phrases keep repeating ("Ladies and gentlemen," "As I was saying"). After hearing them ten times, the translator memorizes their translation. Now, hearing that phrase, they say the translation reflexively — no thinking required. That\'s exactly what JIT does.')}
            {p("The incredible speed of modern JavaScript comes from JIT. V8 (the engine behind Chrome and Node) is shockingly optimized — it compiles hot code paths to native machine code and gets close to C-level speed. The JVM's HotSpot compiler is named for exactly this behavior.")}
            {p("There's a trade-off — JIT compilation itself takes time. So startup is usually slower (it begins in interpreter mode). But long-running code keeps getting faster.")}
            {p(<>Run the loop below — watch when {MONO('square()')} goes "hot" and turns into JIT-compiled native code:</>)}
          </div>
        )}
        <HotPath />
        <Deeper
          bnLabel="আরেকটু গভীরে — tier, deoptimization, warm-up"
          enLabel="go deeper — tiers, deoptimization, warm-up"
        >
          {bn ? (
            <ul lang="bn" style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Tiered compilation:</strong> আধুনিক JIT একাধিক স্তরে কাজ করে — V8-এ Ignition (interpreter) → Sparkplug (baseline) → Maglev → TurboFan (সবচেয়ে optimized)। code যত hot, তত উঁচু tier-এ ওঠে।</li>
              <li style={{ marginBottom: 10 }}><strong>Deoptimization:</strong> JIT অনুমানের উপর optimize করে (যেমন "x সবসময় number")। অনুমান ভাঙলে (হঠাৎ একটা string এল) সে compiled code ফেলে দিয়ে interpreter-এ ফিরে যায় — একে বলে deopt।</li>
              <li><strong>Warm-up:</strong> এজন্যই benchmark-এ প্রথম কয়েক iteration ধীর; JIT-কে গরম হওয়ার সময় দিতে হয়। Long-running server-এ এই cost একবারই লাগে।</li>
            </ul>
          ) : (
            <ul style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Tiered compilation:</strong> modern JITs work in tiers — in V8, Ignition (interpreter) → Sparkplug (baseline) → Maglev → TurboFan (most optimized). The hotter the code, the higher the tier it climbs.</li>
              <li style={{ marginBottom: 10 }}><strong>Deoptimization:</strong> a JIT optimizes on assumptions (e.g. "x is always a number"). Break the assumption (a string suddenly shows up) and it throws away the compiled code and falls back to the interpreter — that's a deopt.</li>
              <li><strong>Warm-up:</strong> this is why the first few iterations of a benchmark are slow; the JIT needs time to warm up. On a long-running server you pay that cost only once.</li>
            </ul>
          )}
        </Deeper>
      </Section>

      <Section num="06" bnH2="যখন আপনি node hello.js চালান" enH2="When you run node hello.js">
        {bn ? (
          <div lang="bn" style={body}>{p('এবার সব একসাথে করে দেখা যাক। আপনি লিখলেন:')}</div>
        ) : (
          <div style={body}>{p("Let's put it all together. You wrote:")}</div>
        )}

        {/* square() code block */}
        <div style={{ margin: '0 0 20px', background: '#1b231b', border: '1px solid #4a493a', overflow: 'hidden', boxShadow: '0 10px 28px rgba(20,18,10,0.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px', background: '#232b23', borderBottom: '1px solid #2e392e' }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff6b6b', display: 'block' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#e0c264', display: 'block' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#00d26a', display: 'block' }} />
            <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 11, color: '#8aa893', marginLeft: 8 }}>hello.js</span>
            <span style={{ flex: 1 }} />
            <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 10, color: '#55695a' }}>JS</span>
          </div>
          <div style={{ display: 'flex', fontFamily: "'Departure Mono',monospace", fontSize: 12.5, lineHeight: 1.9, overflowX: 'auto' }}>
            <div aria-hidden="true" style={{ flex: 'none', textAlign: 'right', color: '#455545', padding: '12px 12px', borderRight: '1px solid #2e392e', userSelect: 'none', whiteSpace: 'pre' }}>{'1\n2\n3\n4\n5\n6'}</div>
            <div style={{ margin: 0, padding: '12px 18px', color: '#cfe8d8', whiteSpace: 'pre' }}>
              <span style={{ color: '#7fae94' }}>function</span> <span style={{ color: '#9fd8b8' }}>square</span>(x) {'{'}{'\n'}
              {'  '}<span style={{ color: '#7fae94' }}>return</span> x * x;{'\n'}
              {'}'}{'\n'}
              <span style={{ color: '#7fae94' }}>for</span> (<span style={{ color: '#7fae94' }}>let</span> i = <span style={{ color: '#d8c88a' }}>0</span>; i &lt; <span style={{ color: '#d8c88a' }}>1000</span>; i++) {'{'}{'\n'}
              {'  '}console.<span style={{ color: '#9fd8b8' }}>log</span>(<span style={{ color: '#9fd8b8' }}>square</span>(i));{'\n'}
              {'}'}
            </div>
          </div>
        </div>

        {bn ? (
          <div lang="bn" style={body}>{p(<>{MONO('node hello.js')} চালালেন। কী কী ঘটে? নিচের যন্ত্রে এক ধাপ এক ধাপ করে দেখুন:</>)}</div>
        ) : (
          <div style={body}>{p(<>You ran {MONO('node hello.js')}. What happens? Step through the engine below:</>)}</div>
        )}
        <CompilePipeline />
        {bn ? (
          <div lang="bn" style={body}>{p(<>এই পুরো process আপনার কাছে invisible। আপনি শুধু দেখছেন output। কিন্তু ভেতরে source code → <Term id="ast">AST</Term> → bytecode → interpreted execution → JIT-compiled native code — একটা elegant pipeline।</>)}</div>
        ) : (
          <div style={body}>{p(<>The whole process is invisible to you. You just see output. But inside: source code → <Term id="ast">AST</Term> → bytecode → interpreted execution → JIT-compiled native code — an elegant pipeline.</>)}</div>
        )}
      </Section>

      <Section num="07" bnH2="আধুনিক জটিলতা: সীমানা মুছে যাচ্ছে" enH2="Modern complexity: the boundaries are dissolving">
        {bn ? (
          <div lang="bn" style={body}>
            {p('আধুনিক language landscape-এ "compiled vs interpreted" পার্থক্যটা প্রায় artificial হয়ে গেছে। প্রায় প্রতিটা modern language-ই hybrid:')}
          </div>
        ) : (
          <div style={body}>
            {p('In the modern language landscape, the "compiled vs interpreted" distinction has become almost artificial. Nearly every modern language is hybrid:')}
          </div>
        )}

        {/* Language table */}
        <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.65)', margin: '0 0 20px', overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', fontFamily: "'Departure Mono',monospace", fontSize: 12, color: '#33301F', minWidth: 420 }}>
            <thead>
              <tr>
                {(bn ? ['ভাষা', 'কীভাবে চলে'] : ['LANGUAGE', 'HOW IT RUNS']).map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid #26241C', fontWeight: 400, color: '#5c5442', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(bn
                ? [
                  ['Python', 'Source → bytecode → CPython VM interprets। PyPy আবার JIT যোগ করে।'],
                  ['JavaScript', 'V8 আর SpiderMonkey — JIT-compilation-এর poster child।'],
                  ['Java', 'JVM bytecode interprets, HotSpot JIT hot code compile করে।'],
                  ['C#', 'Similar — CLR bytecode, JIT compilation।'],
                  ['Go, Rust', 'সরাসরি native compilation, তবে কিছু runtime feature আছে।'],
                  ['C++', 'Ahead-of-Time compilation, তবে template-heavy code JIT-এর মতো specialization করে।'],
                ]
                : [
                  ['Python', 'Source → bytecode → CPython VM interprets. PyPy adds JIT on top.'],
                  ['JavaScript', 'V8 and SpiderMonkey — the poster children of JIT compilation.'],
                  ['Java', 'The JVM interprets bytecode; HotSpot JIT-compiles hot code.'],
                  ['C#', 'Similar — CLR bytecode, JIT compilation.'],
                  ['Go, Rust', 'Direct native compilation, though some runtime features exist.'],
                  ['C++', 'Ahead-of-time compilation, but template-heavy code does JIT-like specialization at compile time.'],
                ]
              ).map(([lang, how]) => (
                <tr key={lang}>
                  <td style={{ padding: '8px 14px', borderBottom: '1px solid #c9bda0', color: '#00753F', whiteSpace: 'nowrap' }}>{lang}</td>
                  <td style={{ padding: '8px 14px', borderBottom: '1px solid #c9bda0' }}>{how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bn ? (
          <div lang="bn" style={body}>
            {p('এই world-এ "কী compiled নাকি interpreted?" প্রশ্নটা অনেক সময় sensible না। বেশি sensible প্রশ্ন — "startup fast, নাকি long-run fast?" "Portable binary চাই, নাকি একবার compile করে সব platform-এ চলবে এমন কিছু?"')}
          </div>
        ) : (
          <div style={body}>
            {p('In this world, "is it compiled or interpreted?" is often the wrong question. The more useful question is — "is startup fast, or is long-run fast?" "Do I want a portable binary, or something I compile once that runs everywhere?"')}
          </div>
        )}

        <Deeper
          bnLabel="আরেকটু গভীরে — bytecode আর VM-এর ভেতর"
          enLabel="go deeper — inside bytecode and VMs"
        >
          {bn ? (
            <ul lang="bn" style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Stack বনাম register VM:</strong> JVM আর CPython stack-based bytecode ব্যবহার করে (operand stack-এ push/pop); Lua-র VM register-based। Register VM-এ instruction কম লাগে, কিন্তু প্রতিটা bytecode বড়।</li>
              <li style={{ marginBottom: 10 }}><strong>Garbage collection:</strong> এই hybrid runtime-গুলোই সাধারণত memory নিজে manage করে — অব্যবহৃত object খুঁজে মুছে দেয়, তাই C-র মতো manual {MONO('free')} লাগে না।</li>
              <li><strong>AOT + JIT একসাথে:</strong> আধুনিক .NET আর Java (GraalVM) কখনো আগে থেকেই native compile করে (AOT) startup দ্রুত করতে, আবার runtime-এ JIT-ও রাখে — সীমানা আরও ঝাপসা।</li>
            </ul>
          ) : (
            <ul style={{ margin: '14px 0 0', paddingLeft: 20, lineHeight: 1.85, fontFamily: "'Anek Latin',sans-serif" }}>
              <li style={{ marginBottom: 10 }}><strong>Stack vs register VMs:</strong> the JVM and CPython use stack-based bytecode (push/pop on an operand stack); Lua's VM is register-based. Register VMs need fewer instructions but each bytecode is larger.</li>
              <li style={{ marginBottom: 10 }}><strong>Garbage collection:</strong> these hybrid runtimes usually manage memory themselves — finding and freeing unused objects — so there's no manual {MONO('free')} like in C.</li>
              <li><strong>AOT + JIT together:</strong> modern .NET and Java (GraalVM) sometimes compile natively ahead of time (AOT) for fast startup while still keeping a JIT at runtime — blurring the line further.</li>
            </ul>
          )}
        </Deeper>

        <Recap>
          {bn ? (
            <>
              <li><strong>CPU শুধু machine code বোঝে।</strong> যেকোনো high-level language থেকে সেখানে পৌঁছাতে একজন translator লাগবেই।</li>
              <li><strong>Compiler আগে থেকে translate করে, interpreter runtime-এ।</strong> সরাসরি speed vs flexibility-এর trade-off।</li>
              <li><strong>Bytecode + VM দুটোর মাঝামাঝি।</strong> Compile হয় একটা intermediate form-এ, তারপর interpret হয়।</li>
              <li><strong>JIT এই approach-এই smart layer যোগ করে।</strong> Hot code runtime-এ native machine code-এ compile হয়ে যায়।</li>
              <li><strong>Modern language সবই hybrid।</strong> "Compiled vs interpreted" পার্থক্য অনেকাংশে artificial হয়ে গেছে।</li>
            </>
          ) : (
            <>
              <li><strong>The CPU only understands machine code.</strong> Getting there from any high-level language requires a translator.</li>
              <li><strong>A compiler translates ahead of time; an interpreter translates at runtime.</strong> The trade-off is speed vs flexibility.</li>
              <li><strong>Bytecode + VM sits in between.</strong> Code compiles to an intermediate form, then that gets interpreted.</li>
              <li><strong>JIT adds a smart layer on top.</strong> Hot code gets compiled to native machine code at runtime.</li>
              <li><strong>Modern languages are all hybrids.</strong> The "compiled vs interpreted" distinction has become largely artificial.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={{ label: { bn: 'সিরিজ hub', en: 'series hub' }, title: 'The Machine Beneath Your Code', href: '/writing/tech-articles', variant: 'hub' }}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৮ — কীপ্রেস থেকে স্ক্রিন' : '08 — From keypress to screen', href: '#', variant: 'next' }}
        bridge={{
          bn: "Article 1 থেকে এখান পর্যন্ত — voltage থেকে JIT compilation পর্যন্ত — সব দেখা হলো। কিন্তু এই সিরিজের একটা মূল প্রশ্ন এখনো ঝুলে আছে। প্রথম আর্টিকেলে জিজ্ঞেস করেছিলাম — x = 5 লিখলে কী হয়? এখন জানি। আজ শেষ প্রশ্ন — আপনি keyboard-এ 'A' চাপলেন, screen-এ 'A' এল। মাঝখানে কী কী ঘটল? এই সিরিজের প্রতিটা আর্টিকেলের সব concept ব্যবহার করে সেই journey-টা দেখব। এই সিরিজের payoff, final article।",
          en: "From Article 1 to here — from voltage to JIT compilation — we've covered everything. But one core question of this series is still hanging. In the first article I asked — what happens when you write x = 5? Now we know. Today, the last question — you press 'A' on your keyboard, 'A' appears on screen. What happened in between? We'll walk through that journey using every concept from this series. The payoff of this series, the final article.",
        }}
      />
      <Colophon />
    </article>
  );
}
