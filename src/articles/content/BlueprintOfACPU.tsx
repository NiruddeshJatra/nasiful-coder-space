import type { ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';
import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Recap } from '../primitives/Recap';
import { RelayNav, SERIES_HUB_CARD } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { AdderWidget } from '../widgets/AdderWidget';
import { CPUDatapath } from '../widgets/CPUDatapath';
import { ClockVisualizer } from '../widgets/ClockVisualizer';

export function BlueprintOfACPU() {
  const { bn } = useLang();

  const bodyStyle = bn
    ? { fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }
    : { fontFamily: "'Anek Latin',sans-serif" };

  const p = (s: string | ReactNode) => <p style={{ margin: '0 0 16px', ...bodyStyle }}>{s}</p>;

  const blockquote = (s: ReactNode) => (
    <blockquote style={{ margin: '0 0 20px', padding: '12px 18px', borderLeft: '3px solid #c9bda0', background: 'rgba(255,252,243,0.5)', color: '#3c382b', ...bodyStyle }}>
      {s}
    </blockquote>
  );

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><a href="/writing/how-does-anything-become-bits" style={{ color: '#00753F' }}>আগের আর্টিকেলে</a> দেখেছিলাম বাস্তব জগতের তথ্য — সংখ্যা, text, image, sound — কীভাবে ০ আর ১-এ রূপ নেয় এবং memory-তে voltage হিসেবে জমা হয়। এবার সেই voltage-এর কী হয়।</p>
            {p('ধরা যাক, ২ এবং ৩ সংখ্যা দুটি এখন RAM-এর কোথাও voltage হিসেবে চুপচাপ বসে আছে। তারা নিজে থেকে কিছুই করতে পারে না। কিন্তু আপনি যখন কোডে লিখলেন:')}
            <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13.5px', background: 'rgba(255,252,243,0.65)', border: '1px solid #c9bda0', color: '#33301F', padding: '13px 18px', margin: '0 0 20px', overflowX: 'auto' }}>result = 2 + 3</pre>
            {p('ঠিক কয়েক ন্যানোসেকেন্ডের মধ্যে memory-তে ৫ তৈরি হয়ে গেল।')}
            {p('প্রশ্ন হলো, সিলিকনের একটা জড় টুকরো কীভাবে হিসাব করল যে ২ আর ৩ যোগ করলে ৫ হয়? তার তো কোনো মানুষের মতো বুদ্ধি নেই। এই আর্টিকেলে আমরা এই দুটি সংখ্যার ট্র্যাক ফলো করে সরাসরি CPU-র হার্ডওয়্যার লেভেলে ঢুকে যাবো — দেখবো কোনো অপারেটিং সিস্টেম বা সফটওয়্যারের সাহায্য ছাড়াই, শুধু পিওর ইলেকট্রনিক্স দিয়ে কীভাবে একটি হিসাব সম্পন্ন হয়।')}
            {p('আমরা মূলত processor-এর ৪টি মূল কম্পোনেন্টের ওপর ফোকাস করবো:')}
            <ul style={{ margin: '0 0 20px', paddingLeft: 24, ...bodyStyle }}>
              <li style={{ marginBottom: 8 }}><strong>ALU (Arithmetic Logic Unit):</strong> যেখানে মূল গাণিতিক হিসাবগুলো হয়।</li>
              <li style={{ marginBottom: 8 }}><strong>Register:</strong> CPU-র ভেতরের অতি দ্রুতগতির লোকাল memory।</li>
              <li style={{ marginBottom: 8 }}><strong>Data Bus:</strong> কম্পোনেন্টগুলোর মধ্যে ডেটা আদান-প্রদানের হাইওয়ে।</li>
              <li style={{ marginBottom: 8 }}><strong>Clock:</strong> পুরো processor-এর timing ও synchronization নিশ্চিত করার oscillator।</li>
            </ul>
            {blockquote(
              <span><strong>একটি জরুরি পার্থক্য:</strong> অনেকেই CPU আর ALU-কে একই জিনিস মনে করে গুলিয়ে ফেলেন। আসলে ALU হলো CPU-র ভেতরের একটি নির্দিষ্ট department মাত্র। একটা বাড়ির রান্নাঘর যেমন পুরো বাড়ির প্রতিনিধি নয়, কিন্তু রান্নার কাজটা সেখানেই হয় — ঠিক তেমনি ALU পুরো processor নয়, কিন্তু গাণিতিক হিসাবের মূল দায়িত্বটা তারই।</span>
            )}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Imagine the numbers 2 and 3 are sitting quietly somewhere in RAM, represented strictly as electrical voltages. Left alone, they do nothing. But the moment you write:')}
            <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13.5px', background: 'rgba(255,252,243,0.65)', border: '1px solid #c9bda0', color: '#33301F', padding: '13px 18px', margin: '0 0 20px', overflowX: 'auto' }}>result = 2 + 3</pre>
            {p('Within a few nanoseconds, the number 5 appears in memory.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>In the <a href="/writing/how-does-anything-become-bits" style={{ color: '#00753F' }}>last article</a> we saw how real-world data — numbers, text, images, sound — becomes 0s and 1s and lands in memory as voltage. Now: what happens to that voltage.</p>
            {p("The core question is mechanical: how does a literal slab of silicon \"know\" that 2 and 3 equal 5? It has no human brain. In this article, we'll track these two numbers as they enter the CPU to see how a calculation executes at the bare-metal hardware level — with zero software or OS abstraction.")}
            {p("We'll focus on four primary internal components:")}
            <ul style={{ margin: '0 0 20px', paddingLeft: 24, ...bodyStyle }}>
              <li style={{ marginBottom: 8 }}><strong>ALU (Arithmetic Logic Unit):</strong> The execution unit where actual arithmetic happens.</li>
              <li style={{ marginBottom: 8 }}><strong>Registers:</strong> The CPU's ultra-fast, local storage slots.</li>
              <li style={{ marginBottom: 8 }}><strong>Data Bus:</strong> The internal highway that moves bits between components.</li>
              <li style={{ marginBottom: 8 }}><strong>Clock:</strong> The oscillator that orchestrates the timing of every operation.</li>
            </ul>
            {blockquote(
              <span><strong>A Critical Distinction:</strong> People often use "CPU" and "ALU" interchangeably, but they are not the same. The ALU is merely a department inside the CPU. Just as a kitchen is not the entire house — even though it's where the cooking happens — the ALU is not the entire processor. It handles the math; the rest of the CPU coordinates the movement.</span>
            )}
          </div>
        )}
      </div>

      {/* Section 01 — ALU */}
      <Section num="01" bnH2="ALU: logic gate থেকে গণিত" enH2="ALU: from logic gates to math">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('CPU-র ভেতরে যেখানে গণিতের হিসাব হয়, সেটাই ALU — Arithmetic Logic Unit। যোগ, বিয়োগ, তুলনা এবং bitwise logic operation (যেমন AND, OR, XOR) — সবকিছুই এখানে ঘটে।')}
            {p('কিন্তু ALU-র ভেতরে কোনো রহস্যময় বুদ্ধিমত্তা নেই। এটা তৈরি হয়েছে আগের আর্টিকেলে দেখা সেই logic gate-গুলো নিখুঁত বিন্যাসে জোড়া লাগিয়ে। দুইটা ১-bit binary সংখ্যা (ধরুন A আর B) যোগ করার circuit কীভাবে বানানো যায় সেটা দেখা যাক।')}
            {p('Binary যোগের নিয়মগুলো সরল:')}
            <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13.5px', background: 'rgba(255,252,243,0.65)', border: '1px solid #c9bda0', color: '#33301F', padding: '13px 18px', margin: '0 0 20px', overflowX: 'auto' }}>{`0 + 0 = 00\n0 + 1 = 01\n1 + 0 = 01\n1 + 1 = 10  (decimal 2)`}</pre>
            {p('খেয়াল করুন:')}
            <ul style={{ margin: '0 0 20px', paddingLeft: 24, ...bodyStyle }}>
              <li style={{ marginBottom: 8 }}><strong>ডানপাশের bit (Sum)</strong> কেবল তখনই ১ হয় যখন A অথবা B-এর যেকোনো একটার মান ১, কিন্তু দুইটাই ১ হলে ০ — ঠিক একটা <strong>XOR gate</strong> এর মতো।</li>
              <li style={{ marginBottom: 8 }}><strong>বাঁপাশের bit (Carry)</strong> কেবল তখনই ১ হয় যখন A এবং B — দুইটাই ১ — এটা ঠিক <strong>AND gate</strong> এর মতো।</li>
            </ul>
            {p('XOR আর AND gate পাশাপাশি জোড়া দিলে তৈরি হয় একটা Half Adder। কিন্তু এখানে একটা সমস্যা আছে।')}
            {p('Half Adder শুধু দুটি একক bit যোগ করতে পারে — মানুষ যেমন হাতে একটা "carry" মনে রাখে বড় সংখ্যা যোগ করার সময়, Half Adder সেটা পারে না। তাহলে এটি 1111 + 0001 যোগ করবে কীভাবে?')}
            {p('এই সমস্যার সমাধান হলো Full Adder। একই কাঠামোর সাথে "Carry In" নামে একটা অতিরিক্ত input যোগ করা হয়, যাতে আগের bit-এর carry পরের bit-এ এসে ঢুকতে পারে।')}
            {p('এখন processor-এ ৬৪-bit-এর দুইটা সংখ্যা যোগ করতে চাইলে কী করতে হবে? সহজ বুদ্ধি হলো — এমন ৬৪টি Full Adder একের পর এক সিরিজে জোড়া দেওয়া। একটা ট্রেনের কথা কল্পনা করুন: প্রতিটা বগি একটা Full Adder। প্রথম বগি carry পাঠায় দ্বিতীয় বগিতে, দ্বিতীয়টা তৃতীয়তে — এভাবে ৬৪ নম্বর বগি পর্যন্ত সেই ছোট্ট carry signal দৌড়াতে থাকে। এই নকশাকে বলা হয় Ripple Carry Adder।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("The place inside a CPU where math happens is the ALU — Arithmetic Logic Unit. Addition, subtraction, comparisons, and bitwise logic operations (like AND, OR, XOR) — all of that goes on here.")}
            {p("But there's no mysterious intelligence inside the ALU. It's built by wiring together the logic gates from the previous article. Let's see how to build a circuit that adds two 1-bit binary numbers (say, A and B).")}
            {p('The rules of binary addition are straightforward:')}
            <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13.5px', background: 'rgba(255,252,243,0.65)', border: '1px solid #c9bda0', color: '#33301F', padding: '13px 18px', margin: '0 0 20px', overflowX: 'auto' }}>{`0 + 0 = 00\n0 + 1 = 01\n1 + 0 = 01\n1 + 1 = 10  (decimal 2)`}</pre>
            {p('Notice the pattern:')}
            <ul style={{ margin: '0 0 20px', paddingLeft: 24, ...bodyStyle }}>
              <li style={{ marginBottom: 8 }}><strong>The right bit (Sum)</strong> is 1 only when either A or B is 1, but 0 when both are 1 — exactly like an <strong>XOR gate</strong>.</li>
              <li style={{ marginBottom: 8 }}><strong>The left bit (Carry)</strong> is 1 only when both A and B are 1 — exactly like an <strong>AND gate</strong>.</li>
            </ul>
            {p("Wire an XOR gate and an AND gate side by side, and you've built a Half Adder. But there's a problem.")}
            {p('A Half Adder can only add two individual bits — when humans add larger numbers, we carry a digit in our head; the Half Adder can\'t. So how would it handle 1111 + 0001?')}
            {p('The solution is the Full Adder. Same basic structure plus an extra input called "Carry In," which lets the carry from a previous bit feed into the next.')}
            {p("Now if a processor wants to add two 64-bit numbers? Chain 64 Full Adders in series. Imagine a train where each carriage represents a single Full Adder. The first carriage passes its carry bit to the second, the second to the third, and that small signal ripples all the way down to the 64th carriage. This architecture is a Ripple Carry Adder.")}
          </div>
        )}

        <AdderWidget />

        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {blockquote(
              <span>
                <strong>থিওরি বনাম বাস্তব:</strong> এই ট্রেনের analogy শেখানোর জন্য চমৎকার হলেও, আধুনিক processor-এ এই পদ্ধতি ব্যবহার করা হয় না। কারণ ৬৪টি বগি পার হতে হতে signal-এ যে সামান্য সময়ের বিলম্ব ঘটে — যাকে বলে <Term id="propdelay">propagation delay</Term> — তা ৩-৫ GHz clock speed-এর জন্য বড্ড ধীরগতির। তাই আধুনিক processor-এ <strong>Carry-Lookahead Adder</strong> বা <strong>Prefix Adder</strong> ব্যবহার করা হয়, যা একটি বিশেষ গাণিতিক কৌশলে ৬৪টি bit-এর carry মান একসাথে (parallel-এ) হিসাব করে ফেলে।
              </span>
            )}
          </div>
        ) : (
          <div style={bodyStyle}>
            {blockquote(
              <span>
                <strong>Theory vs. reality:</strong> While this train analogy is perfect for teaching, modern high-performance CPUs don't use it. The time an electrical signal takes to ripple sequentially through 64 stages — called <Term id="propdelay">propagation delay</Term> — is far too slow for 3–5 GHz clock speeds. Real CPUs use <strong>Carry-Lookahead Adders (CLA)</strong> or <strong>Prefix Adders</strong>, which use parallel routing logic to compute all carry bits simultaneously, bypassing the sequential bottleneck entirely.
              </span>
            )}
          </div>
        )}

        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('তাহলে যোগফল তৈরি হলো। কিন্তু এই যোগফলটা রাখা হবে কোথায়? CPU কি সরাসরি RAM-এ পাঠিয়ে দেবে? না — RAM processor-এর কেন্দ্র থেকে অনেক দূরে। processor-এর একদম নিজের কাছেই অত্যন্ত দ্রুতগতির কিছু memory cell থাকা দরকার। এই cell-গুলোই হলো Register।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("The sum is calculated. But where does it get stored? Does the CPU send it straight to RAM? No — RAM is physically far away in CPU timescales. The CPU needs hyper-fast storage right inside the core. These internal memory cells are called Registers.")}
          </div>
        )}
      </Section>

      {/* Section 02 — Register */}
      <Section num="02" bnH2="Register: CPU-র নিজের ডেস্ক" enH2="Register: the CPU's own desk">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('CPU যখন হিসাব করে, তখন RAM থেকে বারবার ডেটা আনা-নেওয়া করা বেশ ঝামেলার কাজ — RAM CPU থেকে বেশ দূরে এবং তুলনামূলকভাবে ধীরগতির। তাই CPU-র ঠিক ভেতরেই ডেটা ধরে রাখার জন্য একদল অত্যন্ত দ্রুত memory cell থাকে — এদের বলে register।')}
            {p(<>একটি register আসলে কী? <a href="/writing/whats-inside-a-bit" style={{ color: '#00753F' }}>আগের আর্টিকেলে</a> দেখা সেই <Term id="flipflop">flip-flop</Term>-এর কথা মনে আছে? একটি register হলো কতগুলো flip-flop-কে পাশাপাশি লাইনে দাঁড় করিয়ে রাখা — যেন এক সারি বসার সিট। একটি ৬৪-bit register মানে হলো পাশাপাশি ৬৪টি flip-flop, যার প্রতিটা একেকটি ১ bit (০ বা ১) ধরে রাখে।</>)}
            {p('বিশ্ববিদ্যালয়ে microprocessor course-এ AX, BX বা PC-এর মতো নাম শুনে register-কে কোনো রহস্যময় যন্ত্র মনে হতে পারে। কিন্তু আসল সত্য হলো, register কোনো জাদুর বাক্স নয় — এটা শুধু CPU-র নিজের খাতা, যেখানে সে এই মুহূর্তে যে ডেটা নিয়ে কাজ করছে, তা লিখে রাখে।')}
            {p('CPU-র কাছে এখন হিসাবের জন্য ALU আছে, আর ডেটা রাখার জন্য register-ও আছে। কিন্তু এই ডেটা এক জায়গা থেকে আরেক জায়গায় যাবে কীভাবে?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("When the CPU does math, fetching data from RAM repeatedly is expensive — RAM is physically distant and architecturally slower. So the CPU contains ultra-fast internal memory cells right inside the core to hold immediate data. These are called registers.")}
            {p(<>What's a register, really? Remember the <Term id="flipflop">flip-flops</Term> from the <a href="/writing/whats-inside-a-bit" style={{ color: '#00753F' }}>previous article</a>? A register is simply flip-flops sitting side by side in a row — like adjacent passenger seats. A 64-bit register is 64 flip-flops in line, each holding exactly 1 bit (0 or 1).</>)}
            {p("When taking a microprocessor course at university, weird names like AX, BX, or PC can make a register sound mysterious. But the simple truth is a register is nothing but the CPU's immediate scratchpad — a place to jot down the exact data it is actively working on.")}
            {p("The CPU now has a calculator (ALU) and fast slots to hold data (registers). But how does data actually move between them?")}
          </div>
        )}
      </Section>

      {/* Section 03 — Data bus, decoder, multiplexer */}
      <Section num="03" bnH2="Data bus, decoder, multiplexer: তথ্যের হাইওয়ে" enH2="Data bus, decoder, multiplexer: the information highway">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: '#5a5444', ...bodyStyle }}>ব্যাখ্যা সহজ রাখার জন্য এখানে তিনটা কাল্পনিক register-এর নাম ধরা যাক — Register A, Register B, আর Register C। বাস্তব processor-এ এদের নাম অন্যরকম হয়, কিন্তু কাজের ধরন একই।</p>
            {p('CPU-র ভেতরের component-গুলোর মধ্যে ডেটা আদান-প্রদান করার জন্য একগুচ্ছ সংযোগ লাইন থাকে, যেগুলোকে একসাথে বলে data bus। সহজভাবে বললে, এটা CPU-র ভেতরের ডেটা চলাচলের হাইওয়ে। একটা ৬৪-bit CPU-তে data bus-এর width সাধারণত ৬৪ — মানে একই সময়ে ৬৪টা bit parallel-এ যাতায়াত করতে পারে।')}
            {p('কিন্তু হাইওয়েতে যদি traffic control না থাকে, তবে কি বিশৃঙ্খলা হবে না? ধরুন CPU-র কাছে ৫টা register আছে, কিন্তু এই মুহূর্তে ALU-তে শুধু Register A আর Register B-র ডেটা পাঠানো দরকার — বাকি ৩টা register-এর ডেটা যেন ভুলবশত ALU-তে গিয়ে ঢুকে না পড়ে। এই নিয়ন্ত্রণের জন্য দুইটা বিশেষ circuit ব্যবহার করা হয়।')}
            {p(<><strong>Multiplexer (Mux) — এটি একটা traffic signal বা switch।</strong> এটি এমন একটা logic circuit যা একাধিক input line-এর মধ্যে যেকোনো একটাকে select করে সেটার ডেটা output-এ পাঠায়। একটা railway station-এর কথা ভাবুন: অনেকগুলো platform-এ ট্রেন দাঁড়িয়ে আছে। signal ছাড়া সবগুলো একসাথে ছেড়ে দিতে পারবে না — MUX হলো সেই signal, যা বলে দেয় এই মুহূর্তে শুধু Register A-এর ট্রেনটিই চলবে।</>)}
            {p(<><strong>Decoder — এটা বিল্ডিংয়ের security guard-এর মতো।</strong> এটা একটা binary address নেয় এবং ঠিক করে কোন দরজাটি খুলতে হবে। হিসাব শেষে ফলাফলটি যেন ভুল কোনো register-এ না গিয়ে কেবল Register C-তেই জমা হয়, তা এই decoder নিশ্চিত করে।</>)}
          </div>
        ) : (
          <div style={bodyStyle}>
            <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: '#5a5444', ...bodyStyle }}>For simplicity, let's use three imaginary register names — Register A, Register B, and Register C. Real CPUs use different naming schemes, but they operate on identical principles.</p>
            {p("To move data between the internal components of a CPU, there's a set of connection lines called the data bus — the CPU's internal highway for data. In a 64-bit CPU, the data bus is usually 64 wires wide, meaning 64 bits can travel in parallel at the same time.")}
            {p("But a highway without traffic control means chaos. Say the CPU has 5 registers, but right now only Register A and Register B need to send data to the ALU — the other 3 registers' data shouldn't accidentally end up there. Two special circuits handle this.")}
            {p(<><strong>Multiplexer (Mux) — a traffic signal or input switch.</strong> A logic circuit that selects one input line from many and passes its data to the output. Think of a train station where trains wait on multiple platforms — without a signal coordinator, letting them all move at once would cause a crash. The Mux acts as that coordinator, signaling that only Register A is allowed to move right now.</>)}
            {p(<><strong>Decoder — a security guard opening a specific door.</strong> It takes a binary address as input, checks it, and decides which single door to unlock. It ensures the ALU's result lands strictly inside Register C and nowhere else — gate open for the target, all others shut.</>)}
          </div>
        )}

        <CPUDatapath />

        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('Decoder আর multiplexer মিলে CPU ঠিক করে দেয় — এই মুহূর্তে কোন register থেকে ডেটা read হবে, আর ALU-র হিসাব শেষে ফলাফল কোন register-এ গিয়ে জমা হবে।')}
            {p('কিন্তু এই পুরো circuit-এ কখন কোন ডেটা কোথায় যাবে, কখন ALU যোগ করবে, কখন register save করবে — সবার timing এক সুতোয় গাঁথবে কে?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Together, decoder and multiplexer let the CPU decide — which register's data is being read right now, and where the ALU's result lands after the calculation.")}
            {p("But this whole circuit — when does data move, when does the ALU add, when does the register save — who keeps all this synchronized?")}
          </div>
        )}
      </Section>

      {/* Section 04 — Clock */}
      <Section num="04" bnH2="Clock: CPU-র হার্টবিট" enH2="Clock: the CPU's heartbeat">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('CPU-র ভেতরে ডেটা চলাচলকে synchronize করার জন্য একটা oscillator থাকে, যা নির্দিষ্ট তালের ওপর ভিত্তি করে electrical pulse পাঠায় — এটাই clock। CPU-র সব component এই pulse-এর সাথে তাল মিলিয়ে কাজ করে।')}
            {p('Clock-এর speed মাপা হয় GHz (gigahertz) এককে। আপনার processor-এর speed যদি ৩.০ GHz হয়, তার মানে clock প্রতি সেকেন্ডে ৩০০ কোটি বার pulse দিচ্ছে।')}
            {p('একটা orchestra-র কথা ভাবুন। যদি প্রতিটা musician নিজের ইচ্ছামতো বাজানো শুরু করে, তবে সেটা music হবে না — বিশৃঙ্খলা হবে। কিন্তু conductor যখন হাত নাড়েন, সবাই একই মুহূর্তে বাজানো শুরু করে। Clock হলো সেই conductor। প্রতিটি tick-এর সাথে CPU-র flip-flop-গুলো নতুন value save করে, আর ডেটা পরের ধাপে এগিয়ে যায়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("To synchronize data movement inside the CPU, there's an oscillator that sends out electrical pulses in a fixed rhythm — that's the clock. Every component in the CPU marches to those pulses, which keeps the entire system synchronized.")}
            {p("Clock speed is measured in GHz (gigahertz). If your processor runs at 3.0 GHz, the clock is pulsing 3 billion times per second.")}
            {p("Imagine an orchestra. If every musician starts playing whenever they feel like it, that's not music — it's chaos. But when the conductor waves their hand, everyone starts at the same instant. The clock is that conductor. With every tick, the CPU's flip-flops save their new values and data moves to the next stage.")}
          </div>
        )}

        <ClockVisualizer />

        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: '#5a5444', ...bodyStyle }}>তাহলে clock speed যত বাড়াই, কম্পিউটার তত super-fast হয়ে যাবে? না। খুব বেশি speed দিলে transistor-গুলো অতিরিক্ত তাপ তৈরি করে, power খরচ বেড়ে যায়, আর শেষে circuit স্থিতিশীলভাবে কাজ করতে পারে না। আপাতত এটুকু জানলেই চলবে — clock হলো CPU-র সেই conductor, যার তালে তালে পুরো chip-এর কোটি কোটি transistor একসাথে march করে।</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            <p style={{ margin: '0 0 16px', fontStyle: 'italic', color: '#5a5444', ...bodyStyle }}>Does cranking up clock speed just make computers faster? No. Too fast means transistors generate too much heat, power consumption spikes, and eventually the circuit can't work stably. For today's story, this much is enough — the clock is the CPU's conductor, and every transistor marches to its beat.</p>
          </div>
        )}

        {/* 2+3=5 subsection */}
        <div style={{ marginTop: 32, borderTop: '1px solid #c9bda0', paddingTop: 24 }}>
          {bn ? (
            <div lang="bn" style={bodyStyle}>
              <h3 style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13px', letterSpacing: '0.1em', color: '#5a5444', marginBottom: 16 }}>২ + ৩ = ৫: processor-এর ভেতরের সেই কয়েক ন্যানোসেকেন্ড</h3>
              {p('এবার আমাদের জানা component-গুলো দিয়ে result = 2 + 3 হিসাবের পুরো যাত্রা একবার দেখে নেওয়া যাক:')}
              <ol style={{ margin: '0 0 20px', paddingLeft: 24, ...bodyStyle }}>
                <li style={{ marginBottom: 10 }}><strong>Register State:</strong> ২ এবং ৩ আগে থেকেই Register A আর Register B-তে voltage হিসেবে বসে আছে।</li>
                <li style={{ marginBottom: 10 }}><strong>Clock Tick ১:</strong> clock টিক দিল। সঙ্গে সঙ্গে Multiplexer সিগন্যাল দিলো — "Register A আর B, ALU-তে যেতে পারো।" Data Bus-এর মধ্য দিয়ে ২ আর ৩ চলে গেলো ALU-র input-এ।</li>
                <li style={{ marginBottom: 10 }}><strong>ALU-র কারসাজি:</strong> ALU-র ভেতর logic gate আর adder-গুলো মুহূর্তের মধ্যে ২ আর ৩-কে যোগ করে ৫ (0101) তৈরি করে ফেলল।</li>
                <li style={{ marginBottom: 10 }}><strong>Clock Tick ২:</strong> clock আবার টিক দিল। এইবার Decoder Register C-এর কানেকশন ওপেন করে দিল। ALU থেকে আসা ৫ voltage হিসেবে Register C-র flip-flop-এ গিয়ে স্থায়ীভাবে বসে পড়ল।</li>
              </ol>
              {p('কয়েক nanosecond-এর পুরো বিষয়টা। কোনো magic নেই — শুধু voltage-এর pattern, logic gate-এর arrangement, আর clock-এর tick।')}
            </div>
          ) : (
            <div style={bodyStyle}>
              <h3 style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13px', letterSpacing: '0.1em', color: '#5a5444', marginBottom: 16 }}>2 + 3 = 5: A few nanoseconds inside the hardware</h3>
              {p("Let's replay the microarchitecture journey of our two numbers for result = 2 + 3:")}
              <ol style={{ margin: '0 0 20px', paddingLeft: 24, ...bodyStyle }}>
                <li style={{ marginBottom: 10 }}><strong>Register State:</strong> The numbers 2 and 3 are sitting quietly inside Register A and Register B as static voltage patterns.</li>
                <li style={{ marginBottom: 10 }}><strong>Clock Tick 1:</strong> The clock ticks. Immediately, the Multiplexer triggers: "Register A and B, proceed to the ALU." The voltages for 2 and 3 rush through the data bus into the ALU inputs.</li>
                <li style={{ marginBottom: 10 }}><strong>The ALU Action:</strong> Inside the ALU, current races through the logic gates and adders. In under a nanosecond, the electrical signals settle into a voltage pattern representing 5 (0101).</li>
                <li style={{ marginBottom: 10 }}><strong>Clock Tick 2:</strong> The clock ticks again. This time, the Decoder unlocks the gate for Register C. The voltage for 5 travels down the bus and stabilizes inside Register C's flip-flops.</li>
              </ol>
              {p("The entire sequence wraps up in a few nanoseconds. Zero magic here — just voltage patterns, strategic logic gates, and a clock keeping time.")}
            </div>
          )}
        </div>
      </Section>

      {/* Reality corner */}
      <Section num="05" bnH2="সবকিছু এত সরল নয়" enH2="Reality corner">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এই আর্টিকেলে CPU-কে ইচ্ছাকৃতভাবে অনেক সহজ করে দেখানো হয়েছে।')}
            {p('বাস্তব processor-এ pipeline, cache, branch prediction, out-of-order execution — এরকম আরও অনেক জটিল mechanism থাকে। একটা modern CPU একই সময়ে একাধিক instruction-এর বিভিন্ন stage handle করে, ভবিষ্যতে কী দরকার হবে সেটা আগেই অনুমান করে ডেটা load করে রাখে।')}
            {p('কিন্তু সেই সব complexity এই মৌলিক কাঠামোর উপরই দাঁড়িয়ে। ALU, register, bus, clock — এই চারজন সবকিছুর মূল ভিত্তি।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('We simplified the CPU on purpose in this article.')}
            {p("Real processors have pipelines, caches, branch prediction, out-of-order execution — many more layers of complexity. A modern CPU handles multiple instructions at different stages simultaneously, predicts what will be needed next, and preloads data accordingly.")}
            {p("But all of that complexity is built on this foundation. ALU, register, bus, clock — these four sit underneath everything.")}
          </div>
        )}

        <Recap>
          {bn ? (
            <>
              <li>CPU কখনো "গণিত বোঝে" না — logic gate-এর arrangement-ই তাকে যোগ-বিয়োগ করতে বাধ্য করে।</li>
              <li>Register হলো CPU-র নিজের ডেস্ক — যা নিয়ে এই মুহূর্তে কাজ হচ্ছে, সেটা এখানেই থাকে। RAM অনেক দূরে।</li>
              <li>Clock তাল ঠিক করে, গতি না — সবাই কখন কাজ শুরু করবে সেটা clock ঠিক করে দেয়। তালহীন CPU মানে corrupt CPU।</li>
              <li>Bus হলো CPU-র হাইওয়ে; Mux আর decoder ট্রাফিক কন্ট্রোল — ঠিক ডেটা ঠিক জায়গায় পৌঁছানোর দায়িত্ব এদের।</li>
            </>
          ) : (
            <>
              <li>The CPU never "understands math" — the arrangement of logic gates forces it to add. There's no deliberation.</li>
              <li>A register is the CPU's own desk — whatever it's actively working on sits here. RAM is too far; the register is right at hand.</li>
              <li>The clock sets rhythm, not speed — it decides when things start, not how fast they can go. A CPU without rhythm is a corrupt CPU.</li>
              <li>The bus is the CPU's highway; the Mux and decoder are traffic control — getting the right data to the right place is their job.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={SERIES_HUB_CARD}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৪ — হার্টবিট: Fetch-Decode-Execute' : '04 — Heartbeat: Fetch-Decode-Execute', href: '/writing/heartbeat-fde', variant: 'next' }}
        bridge={{ bn: 'একটা বিশাল প্রশ্ন এখনো বাকি রয়ে গেল। এই উদাহরণে ধরে নেওয়া হয়েছিল CPU জানত তাকে যোগ করতে হবে — কিন্তু সে সেটা জানল কীভাবে? কে বলল তাকে "এবার Register A আর Register B যোগ করো"? এই instruction কোথা থেকে এল? এখান থেকেই শুরু হচ্ছে CPU-র আসল গল্প।', en: "One huge question is still left over. In this example we assumed the CPU knew it had to add — but how did it know that? Who told it to add Register A and Register B? Where did that instruction come from? That's where the real story of the CPU begins." }}
      />
      <Colophon />
    </article>
  );
}
