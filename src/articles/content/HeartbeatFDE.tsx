import type { ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';
import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Deeper } from '../primitives/Deeper';
import { Recap } from '../primitives/Recap';
import { RelayNav } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { InstructionAnatomy } from '../widgets/InstructionAnatomy';
import { ProgramCounterDemo } from '../widgets/ProgramCounterDemo';
import { FetchDecodeExecute } from '../widgets/FetchDecodeExecute';
import { InstructionCycleLoop } from '../widgets/InstructionCycleLoop';
import { PipelineVisualizer } from '../widgets/PipelineVisualizer';

const LINK = { color: '#00753F' };

export function HeartbeatFDE() {
  const { bn } = useLang();

  const bodyStyle = bn
    ? { fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }
    : { fontFamily: "'Anek Latin',sans-serif" };

  const p = (s: string | ReactNode) => <p style={{ margin: '0 0 16px', ...bodyStyle }}>{s}</p>;

  const mono = (s: string) => (
    <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>{s}</span>
  );

  const pre = (s: string) => (
    <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13px', background: 'rgba(255,252,243,0.65)', border: '1px solid #c9bda0', color: '#33301F', padding: '13px 18px', margin: '0 0 20px', overflowX: 'auto' }}>
      {s}
    </pre>
  );

  const h3Style = { fontFamily: bn ? "'Anek Bangla',sans-serif" : "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: '20px', lineHeight: bn ? 1.5 : 1.4, margin: '24px 0 12px' };

  const ulStyle = { margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...bodyStyle };

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p(<><a href="/writing/cpu-blueprint" style={LINK}>আগের আর্টিকেলে</a> দেখা গেছে — ২ আর ৩ কীভাবে যোগ হয়ে ৫ হয়। কিন্তু পুরো কাহিনী শেষ হয়নি। একটা প্রশ্নের উত্তর দেয়া বাকি ছিল।</>)}
            {p(<>CPU জানল কীভাবে যে এই মুহূর্তে তাকে <em>যোগ</em> করতে হবে? বিয়োগ না, গুণ না — যোগ। আর <em>এই</em> দুইটা register-এর ডেটা নিতে হবে, বাকিগুলো না। এই instruction তাকে কে দিল?</>)}
            {p('আজকের গল্পটা ঠিক এখান থেকেই শুরু।')}
            <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.65)', padding: '14px 18px', margin: '0 0 16px' }}>
              <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#00753F', letterSpacing: '0.08em', marginBottom: 8 }}>
                // সিলিকন সিটির time-lapse
              </div>
              <p style={{ margin: 0, fontSize: '15.5px', ...bodyStyle }}>
                আমরা এখনও সিলিকনের সেই ছোট্ট শহরের ভেতরেই আছি, যেখানে ALU, Register, Data Bus আর Clock একসাথে কাজ করছে। তবে আজকে আমাদের ফোকাস পার্টসগুলোর ওপর নয়, বরং সময়ের ওপর। আগের আর্টিকেলটি ছিল একটি স্থিরচিত্র — সিলিকনের ভেতরে কী কী যন্ত্রাংশ সাজানো থাকে তার বিবরণ। আর এই আর্টিকেলটি হবে একটি চলমান ভিডিও। এক মুহূর্ত থেকে আরেক মুহূর্তে সিপিইউ-র ভেতরে ঠিক কী ঘটে, কীভাবে একটি ইন্সট্রাকশন মেমোরি থেকে বেরিয়ে এসে প্রসেসরের ভেতরে ঢোকে, নিজের অর্থ প্রকাশ করে এবং একটি বাস্তব কাজে পরিণত হয় — আজ আমরা সেটাই দেখব।
              </p>
            </div>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p(<>In the <a href="/writing/cpu-blueprint" style={LINK}>last article</a>, we traced the exact hardware path of how the numbers 2 and 3 combine to form 5. Yet, the core mystery of execution remains unsolved.</>)}
            {p(<>How did the CPU actually know it was supposed to perform an <em>ADD</em> operation at that exact moment? Why not a subtraction or a multiplication? And how did it know to pull data from those two specific registers while ignoring the rest? Who issued that command?</>)}
            {p('That is the story we are breaking down today.')}
            <div style={{ border: '1px solid #c9bda0', background: 'rgba(255,252,243,0.65)', padding: '14px 18px', margin: '0 0 16px' }}>
              <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#00753F', letterSpacing: '0.08em', marginBottom: 8 }}>
                // a silicon time-lapse
              </div>
              <p style={{ margin: 0, fontSize: '15.5px', ...bodyStyle }}>
                We are still operating inside that same compact silicon landscape where the ALU, registers, bus, and clock coexist. However, our focus today shifts from physical components to time itself. If the previous article was a still photograph detailing the internal hardware topography of the chip, this article is a moving picture. We will track exactly what happens inside the CPU from one clock cycle to the next — watching how an instruction leaves system memory, enters the processor, decodes its own meaning, and translates into raw execution.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section 01 — instructions are just bits */}
      <Section num="01" bnH2="instruction-ও শুধু bit" enH2="Instructions are just bits">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('আমরা যখন কোনো কোড লিখি, তখন আমাদের মনে হয় "কোড" আর "ডেটা" সম্পূর্ণ ভিন্ন দুটি জিনিস। কিন্তু সিলিকনের একদম গভীরে নেমে দেখলে দেখা যাবে, instruction আর ডেটা — দুটোই memory-তে ঠিক একই রকম দেখতে। শুধু voltage-এর pattern। ০ আর ১-এর একটা sequence।')}
            {p('তার মানে, "যোগ করো" — এই instruction-টাও শেষ পর্যন্ত একটা bit sequence। "লাল pixel" — সেটাও একটা bit sequence। "42" সংখ্যাটা memory-তে যেভাবে বসে থাকে, "ADD" instruction-ও ঠিক সেভাবেই বসে থাকে। শুধু voltage। memory চিনে না কোনটা instruction, কোনটা ডেটা। memory-র কাছে সবই একই ধরনের bit।')}
            {p(<>এটা <a href="/writing/the-machine-beneath-your-code" style={LINK}>প্রথম আর্টিকেলের</a> সেই কথারই আরেকটা রূপ — <strong>CPU is blind, software gives meaning</strong>। এখানেও তেমনই। একই bit sequence, context ভেদে instruction হতে পারে, ডেটাও হতে পারে।</>)}
            {p('তাহলে CPU একটা bit sequence-কে "instruction" হিসেবে treat করবে কেন? এই প্রশ্নে আসছি একটু পরে। আগে দেখা যাক, একটা instruction আসলে দেখতে কেমন হয়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('When we write programs, we naturally treat "code" and "data" as fundamentally distinct concepts. But at the silicon level, instructions and data look identical in memory. Both are nothing more than physical voltage patterns — a sequence of 0s and 1s.')}
            {p('The command "ADD," the color values of a red pixel on your screen, and the integer "42" are all stored in memory using the exact same physical mechanism. Memory is entirely passive; it cannot differentiate between an execution command and a raw variable. To the hardware, it is all just electrical charges.')}
            {p(<>This reinforces our core architectural rule from the <a href="/writing/the-machine-beneath-your-code" style={LINK}>first article</a> — <strong>the CPU is blind; software gives meaning</strong>. The exact same bit sequence can represent an instruction or a piece of data depending entirely on the context.</>)}
            {p("How, then, does the CPU distinguish a command sequence from data? We'll get to that question shortly. First, let's dissect what an instruction actually looks like under the hood.")}
          </div>
        )}
      </Section>

      {/* Section 02 — anatomy of an instruction */}
      <Section num="02" bnH2="একটা instruction-এর ব্যবচ্ছেদ" enH2="Anatomy of an instruction">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('ধরুন CPU-কে বলতে চাই: "Register A আর Register B যোগ করে ফলাফল Register C-তে রাখো।" এই পুরো বাক্যটি মেমোরিতে কীভাবে সাজানো থাকে?')}
            {p('বাস্তব প্রসেসরে একটি instruction ৩২ বা ৬৪ বিটের হয়ে থাকে। তবে বোঝার সুবিধার জন্য আমরা ধরে নিই আমাদের instruction ১৩ বিটের একটি নির্দিষ্ট ফরম্যাট বা কাঠামো মেনে চলে:')}
            {pre('0001   | 001   | 010   | 011\nOpcode | Reg A | Reg B | Reg C')}
            {p('একটি স্ট্যান্ডার্ড instruction প্রধানত দুটি অংশে বিভক্ত থাকে:')}
            <ul style={ulStyle}>
              <li>
                <Term id="opcode">Opcode</Term> <strong>(Operation Code):</strong> instruction-এর প্রথম অংশ, যা CPU-কে বলে দেয় <em>কী</em> কাজ করতে হবে। আমাদের কাল্পনিক ডিজাইনে, প্রথম ৪টি বিট হলো Opcode। প্রসেসরের হার্ডওয়্যারে ফিক্সড করা থাকে যে {mono('0001')} মানে ADD (যোগ), {mono('0010')} মানে SUB (বিয়োগ), আর {mono('0011')} মানে LOAD।
              </li>
              <li>
                <strong>Operand:</strong> instruction-এর পরের অংশগুলো, যা বলে দেয় <em>কার ওপর</em> অপারেশনটি চালানো হবে। এখানে বাকি বিটগুলো হলো রেজিস্টারগুলোর ৩-বিটের বাইনারি অ্যাড্রেস বা ঠিকানা (যেমন: Register A = {mono('001')}, B = {mono('010')}, C = {mono('011')})।
              </li>
            </ul>
            {p('CPU যখন মেমোরি থেকে এই ১৩টি বিট নিজের ভেতরে টেনে নেয়, সে তার Control Unit-এর decoder দিয়ে প্রথম ৪ বিট কেটে আলাদা করে এবং মুহূর্তে বুঝে যায় — "আমাকে এখন যোগ করতে হবে।" এরপর সে পরের বিটগুলো দেখে চিনে নেয় ডেটার উৎস এবং গন্তব্য। নিচের যন্ত্রে opcode আর operand পাল্টে দেখুন — বিটগুলো কীভাবে বদলায়:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Suppose we want to command the CPU to: "Add the contents of Register A and Register B, then store the result in Register C." How is that entire sentence laid out in memory?')}
            {p('While modern production processors utilize 32-bit or 64-bit instruction sets, we can illustrate the concept using a simplified 13-bit instruction format:')}
            {pre('0001   | 001   | 010   | 011\nOpcode | Reg A | Reg B | Reg C')}
            {p('Every hardware instruction is cleanly partitioned into specific bit fields:')}
            <ul style={ulStyle}>
              <li>
                <Term id="opcode">Opcode</Term> <strong>(Operation Code):</strong> The opening segment of the bit sequence that dictates the nature of the operation. In our 13-bit model, the first 4 bits serve as the opcode. The CPU's hardwired logic recognizes {mono('0001')} as ADD, {mono('0010')} as SUB, and {mono('0011')} as LOAD.
              </li>
              <li>
                <strong>Operand fields:</strong> The remaining segments of the instruction that specify what the operation should act upon. Here, these fields contain the 3-bit binary addresses pointing directly to the internal registers (Register A = {mono('001')}, B = {mono('010')}, C = {mono('011')}).
              </li>
            </ul>
            {p('The moment the CPU pulls these 13 bits into its core, it isolates the first 4 bits. The internal control circuitry decodes this pattern instantly: "Execute an addition." It then reads the remaining operands to locate its data sources and target destination. Change the opcode and operands on the instrument below and watch the bits follow:')}
          </div>
        )}

        <InstructionAnatomy />
      </Section>

      {/* Section 03 — program counter */}
      <Section num="03" bnH2="Program Counter: কার পালা এখন?" enH2="Program Counter: whose turn is it?">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('মেমোরির কাছে যদি instruction আর ডেটা হুবহু একই রকম দেখতে হয়, তাহলে CPU কীভাবে বোঝে যে মেমোরির কোন অংশটি একটি কমান্ড আর কোন অংশটি সাধারণ ডেটা? আর memory-তে এত এত instruction — একটার পর একটা কীভাবে ঠিক ক্রমে execute হবে?')}
            {p(<>এই সমস্যার সমাধানের জন্য CPU-র ভেতরে একটা বিশেষ register থাকে — যার নাম <Term id="pc">Program Counter</Term> (সংক্ষেপে PC)। কোনো কোনো আর্কিটেকচারে একে Instruction Pointer-ও বলে।</>)}
            {p('এই PC-র কাজ একটাই — এই মুহূর্তে memory-র কোন address থেকে পরের instruction পড়তে হবে, সেই address-টা ধরে রাখা।')}
            {p('কম্পিউটার যখন কোনো প্রোগ্রাম চালু করে, তখন অপারেটিং সিস্টেম PC-র ভেতরে ওই প্রোগ্রামের ঠিক প্রথম instruction-এর address বসিয়ে দেয়। ব্যস, প্রসেসরের ইঞ্জিন চালু হয়ে গেল। সিপিইউ চোখ বন্ধ করে PC-র নির্দেশ করা address-এ যায় এবং ওখান থেকে যে bit sequence পায়, সেটিকে instruction হিসেবে ধরে নেয়। কাজ শেষে PC নিজে থেকে এক ধাপ বাড়ে — পরের instruction-এর দিকে ইঙ্গিত করে।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('If instructions and raw data look identical within memory, why does the CPU interpret one sequence of bits as a command rather than a simple number? And with billions of instructions packed into system memory, how does the hardware guarantee they execute in the exact order intended by the software?')}
            {p(<>To manage this sequence, the CPU relies on a dedicated internal register known as the <Term id="pc">Program Counter</Term> (PC for short), frequently referred to as the Instruction Pointer.</>)}
            {p('The PC is bound to a single architectural task: it continuously holds the exact memory address of the next instruction scheduled for execution.')}
            {p('When the operating system launches an application, it loads the memory address of the program\'s very first instruction directly into the PC. From that moment, the hardware engine is locked in. The CPU accesses the address stored in the PC and implicitly treats whatever bit sequence it retrieves as a valid machine command. Once done, the PC increments on its own — pointing at the next instruction.')}
          </div>
        )}

        <ProgramCounterDemo />

        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p(<>সহজ কথায়, "কোনটা instruction, কোনটা data" — এই পার্থক্যটা memory-তে <em>নেই</em>। কোথাও লেখা থাকে না। পার্থক্যটা তৈরি হয় PC-র মাধ্যমে। PC প্রসেসরের কাজের সময়ে মেমোরির যে অংশকে ইঙ্গিত করে, ভেতরের সার্কিটগুলো সেই bit-গুলোকে instruction হিসেবে treat করে। বাকি অংশগুলো সাধারণ data হিসেবে মেমোরিতে পড়ে থাকে।</>)}
            {p('এবার সব উপাদান হাতে আছে। Instruction memory-তে বসে আছে। PC ঠিক জানে কোনটা এখন পড়তে হবে। এবার actual cycle-টা কীভাবে ঘটে?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('To put it plainly, the boundary between "instruction" and "data" does not exist as a physical marker inside the memory cells. The distinction is defined entirely by the Program Counter. Whatever the PC targets during the command phase is isolated as an instruction; everything else remains inert data.')}
            {p('With our operational units defined, the instructions queued in memory, and the PC tracking the active address, we can now map the execution engine.')}
          </div>
        )}
      </Section>

      {/* Section 04 — the FDE cycle */}
      <Section num="04" bnH2="Fetch-Decode-Execute: কম্পিউটিং-এর মৌলিক রিদম" enH2="Fetch-Decode-Execute: the core computing rhythm">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p(<>একটি instruction মেমোরি থেকে এসে পুরোপুরি সম্পন্ন হওয়া পর্যন্ত পুরো প্রক্রিয়াটি তিনটি প্রধান ধাপে বিভক্ত। একে বলা হয় <strong>Instruction Cycle</strong> বা প্রসেসরের মৌলিক লাইফ-সাইকেল। ধাপ তিনটি হলো: Fetch, Decode, এবং Execute।</>)}

            <h3 style={h3Style}>১. Fetch (instruction টেনে আনা)</h3>
            {p('এই প্রথম ধাপে কোনো মগজ খাটানোর কাজ নেই, এটি স্রেফ ট্রান্সপোর্টেশন বা পরিবহনের ধাপ।')}
            {p(<>CPU-র Control Unit প্রথমে PC-তে থাকা মেমোরি address-টি পড়ে নেয়। এরপর প্রসেসরের Address Bus-এর মাধ্যমে সেই ঠিকানাটি র‍্যামে (RAM) পাঠানো হয়। মেমোরি সেই নির্দিষ্ট address-টি খুঁজে বের করে তার ভেতরে থাকা ১৩টি bit-কে Data Bus-এর তার দিয়ে CPU-র কাছে ফেরত পাঠায়। এই bit-গুলো এসে প্রসেসরের ভেতরের আরেকটি বিশেষ register-এ জমা হয়, যার নাম <Term id="ir">Instruction Register</Term> (সংক্ষেপে IR)।</>)}
            {p('ঠিক এই মুহূর্তেই, PC মেমোরির পরবর্তী instruction-টি ধরার জন্য নিজের ভেতরের address value এক ধাপ বাড়িয়ে নেয় (increment করে)।')}

            <h3 style={h3Style}>২. Decode (instruction-এর অর্থ উদ্ধার)</h3>
            {p('Instruction-এর bit-গুলো এখন প্রসেসরের ভেতরে, IR register-এ এসে বসে আছে। কিন্তু প্রসেসরের ভেতরের হার্ডওয়্যার এখনো জানে না এই ভোল্টেজের হিজিবিজি প্যাটার্নটি আসলে কী করতে বলছে।')}
            {p(<>এই ধাপে চার্জ নেয় প্রসেসরের আসল ডিরেক্টর — <Term id="cu">Control Unit</Term> (সংক্ষেপে CU)। Control Unit নিজে কোনো গাণিতিক হিসাব করে না, সে মূলত অন্য পার্টসগুলোকে পরিচালনা করে।</>)}
            {p(<>CU প্রথমে IR-এ থাকা instruction-এর প্রথম ৪টি bit (Opcode) কেটে নেয়। এরপর একটি অভ্যন্তরীণ ডিকোডার সার্কিটের মাধ্যমে সেই ৪টি bit-কে অ্যানালাইসিস করে। বিট প্যাটার্ন যদি হয় {mono('0001')} (ADD), তবে Control Unit মুহূর্তে বুঝে যায় এখন যোগ করতে হবে। সে সাথে সাথে পুরো চিপের ভেতরে থাকা বিভিন্ন control wire বা নিয়ন্ত্রণ তারের ভোল্টেজ বদলে দেয়:</>)}
            <ul style={ulStyle}>
              <li><strong>ALU-কে বলে:</strong> "তোমার ভেতরের যোগ করার সার্কিট (Add Mode) অন করো।"</li>
              <li><strong>Multiplexer-কে বলে:</strong> "রাস্তা খুলে দাও, যেন Register A আর Register B-র data সরাসরি ALU-র ইনপুটে চলে যায়।"</li>
              <li><strong>Destination Decoder-কে বলে:</strong> "তুমি তৈরি থাকো, ALU-র আউটপুট কিন্তু সরাসরি Register C-তে যাবে।"</li>
            </ul>

            <h3 style={h3Style}>৩. Execute (বাস্তব রূপায়ণ)</h3>
            {p('সব সিগন্যাল রেডি, ট্রাফিক লাইট গ্রিন। এবার শুরু হয় আসল অ্যাকশন।')}
            {p(<>ক্লকের টাইমিং সিগন্যাল অনুযায়ী Register A-এর value (২) এবং Register B-এর value (৩) মাল্টিপ্লেক্সার পার হয়ে ALU-র ফুল-অ্যাডার সার্কিটে প্রবেশ করে। লজিক গেটের মধ্য দিয়ে কারেন্ট প্রবাহিত হয়ে আউটপুট লাইনে ৫ ({mono('0101')}) তৈরি হয়। এই নতুন ভোল্টেজ প্যাটার্নটি অভ্যন্তরীণ data বাসের তার বেয়ে সরাসরি Register C-তে গিয়ে পৌঁছায়। ক্লকের পরবর্তী ট্রানজিশনে সেই ৫ value-টি Register C-র ফ্লিপ-ফ্লপগুলোতে পার্মানেন্টলি ল্যাচ বা সেভ হয়ে যায়।</>)}
            {p('নিচের যন্ত্রে পুরো সাইকেলটা নিজে একবার চালিয়ে দেখতে পারেন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p(<>The transition of an instruction from system memory to finished execution is governed by a recurring cycle divided into three structural phases. This is the <strong>Instruction Cycle</strong> — the processor's fundamental life-cycle: Fetch, Decode, and Execute.</>)}

            <h3 style={h3Style}>1. Fetch</h3>
            {p('The cycle opens with the Fetch stage — a purely logistical phase focused on data transport rather than processing.')}
            {p(<>The CPU's control unit samples the memory address currently held inside the PC. It pushes this address across the Address Bus out to the system RAM. The memory hardware locates the specified address, samples the 13-bit configuration stored within it, and sends those bits back across the Data Bus directly to the CPU core. These bits are immediately latched into another specialized internal repository: the <Term id="ir">Instruction Register</Term> (IR for short).</>)}
            {p('Simultaneously, the PC increments its internal value, automatically pointing to the address of the next instruction in line for the subsequent cycle.')}

            <h3 style={h3Style}>2. Decode</h3>
            {p('The instruction is now sitting inside the CPU within the IR, but the underlying execution hardware cannot yet interpret this specific configuration of voltages.')}
            {p(<>This is where the director of the microprocessor takes control: the <Term id="cu">Control Unit</Term> (CU). The CU does not compute numbers or alter variables; its sole purpose is to orchestrate the rest of the CPU components.</>)}
            {p(<>The CU isolates the opening 4 bits (the Opcode field) from the IR. It routes these bits through a hardware network called a decoder circuit. By decoding the binary configuration — such as {mono('0001')} for an ADD command — the CU determines exactly which execution paths must activate. It instantly alters the electrical state of the internal control wires:</>)}
            <ul style={ulStyle}>
              <li><strong>To the ALU:</strong> "Engage the internal addition circuitry (Add Mode)."</li>
              <li><strong>To the Multiplexer:</strong> "Open the internal data paths so the contents of Register A and Register B route straight to the ALU inputs."</li>
              <li><strong>To the Destination Decoder:</strong> "Prime the gating logic of Register C to intercept and latch the upcoming output from the ALU."</li>
            </ul>

            <h3 style={h3Style}>3. Execute</h3>
            {p('With all control vectors set and the hardware paths stabilized, the execution phase begins.')}
            {p(<>Driven by the clock timing rhythm, the value from Register A (2) and the value from Register B (3) clear the multiplexer gates and hit the ALU's full-adder architecture. The current propagates through the interconnected logic gates, stabilizing at the output as binary 5 ({mono('0101')}). This voltage pattern is driven onto the internal data bus lines directly to the input gates of Register C. On the final timing boundary, the value 5 is latched cleanly into Register C's flip-flops, finalizing the state transition.</>)}
            {p('Step through the full cycle yourself on the instrument below — every press is one moment of the clock:')}
          </div>
        )}

        <FetchDecodeExecute />
      </Section>

      {/* Section 05 — the continuous heartbeat */}
      <Section num="05" bnH2="অবিরাম হার্টবিট" enH2="The continuous heartbeat">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('একটি instruction-এর গল্প শেষ হলো। কিন্তু CPU-র ডিকশনারিতে "বিশ্রাম" বলে কোনো শব্দ নেই।')}
            {p('ক্লকের পরের পালস আসার সাথে সাথেই CPU আবার প্রথম ধাপ অর্থাৎ Fetch-এ ফেরত চলে যায়। PC যেহেতু আগের ধাপেই এক ধাপ বেড়ে মেমোরির পরের address-টি ধরে রেখেছে, তাই CPU এবার মেমোরির নতুন ঠিকানা থেকে পরের instruction-টি টেনে আনে, সেটিকে ডিকোড করে এবং execute করে।')}
            {p('এই চক্রটি কম্পিউটারে অবিরাম চলতে থাকে: Fetch → Decode → Execute → Fetch... যতক্ষণ না কম্পিউটারটি বন্ধ করা হচ্ছে। একটি 3.0 GHz ক্লক স্পিডের প্রসেসরে প্রতি সেকেন্ডে এই সাইকেলটি কোটি কোটি বার সম্পন্ন হয়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('The execution of the instruction wraps up, but the CPU does not pause.')}
            {p('The moment the next clock pulse arrives, the CPU loops back to the Fetch stage. Because the PC updated its address tracking during the previous phase, the CPU smoothly pulls the next command from memory, decodes its operational signals, and drives it through the execution stage.')}
            {p('This loop repeats indefinitely: Fetch → Decode → Execute → Fetch... for as long as the machine remains powered on. In a 3.0 GHz processor, this cycle executes billions of times every single second.')}
          </div>
        )}

        <InstructionCycleLoop />

        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('আপনি যখন স্ক্রিনে এই আর্টিকেলটি স্ক্রল করছেন, মাউস নড়াচ্ছেন, ব্যাকগ্রাউন্ডে গান শুনছেন কিংবা কোনো AI চ্যাটবটের সাথে কথা বলছেন — তার পেছনে রয়েছে এই তিনটি ধাপের কোটি কোটি বারের অবিরাম পুনরাবৃত্তি। সফটওয়্যারের যত জটিল লেয়ারই আমরা উপরে তৈরি করি না কেন, একদম নিচে সিলিকনের বাস্তবতায় সবকিছু এই সাধারণ রিদমে এসে থিতু হয়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Every single interaction on a modern computer — from the vertical scrolling of a browser window to tracking mouse coordinates or querying an AI language model — reduces to the relentless repetition of these three stages. Regardless of how many abstract software frameworks are layered on top, everything ultimately resolves down to this hardware rhythm running on silicon.')}
          </div>
        )}
      </Section>

      {/* Section 06 — the whole story once through */}
      <Section num="06" bnH2="পুরো গল্পটা একবার" enH2="The whole story, once through">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এবার সেই যোগ করার instruction-এর পুরো যাত্রা একবার চালিয়ে দেখা যাক।')}
            {p(<>কোথাও memory-তে একটা bit sequence বসে আছে — {mono('0001 001 010 011')}। কেউ জানে না এটা কী। শুধু voltage-এর একটা pattern।</>)}
            {p(<>কিন্তু PC-তে সেই bit sequence-এর address রাখা আছে। Clock একটা tick দিল। <strong>Fetch</strong> শুরু। CPU সেই address-এ গেল, bit-গুলো তুলে আনল, IR-এ বসিয়ে দিল। এই মুহূর্তে PC নিজে থেকে বেড়ে গেল — এখন পরের address-এ point করছে।</>)}
            {p(<>Clock আরেকটা tick দিল। <strong>Decode</strong> শুরু। Control Unit IR-এর প্রথম ৪ bit দেখে বলল — "ADD।" সঙ্গে সঙ্গে control signal ছড়িয়ে পড়ল CPU-র বিভিন্ন অংশে। ALU যোগ mode-এ গেল। Mux Register A আর Register B বেছে নিল। Decoder Register C-কে প্রস্তুত করল।</>)}
            {p(<>Clock আরেকটা tick দিল — এবার <strong>Execute</strong>। ২ আর ৩ চলে গেল ALU-র দিকে, ৫ বেরিয়ে এল, Register C-তে বসে গেল।</>)}
            {p('তিনটা ধাপে একটা instruction সম্পন্ন। CPU-র কাছে এটা মাত্র একটা হার্টবিট। আর এই মুহূর্তেই — কোনো বিরাম নেই — PC পরের instruction-এর দিকে ইঙ্গিত করছে। সেটাও fetch হবে। Decode হবে। Execute হবে।')}
            {p('আপনার React app। YouTube video। Photoshop। AI chatbot। সব — literally সব — এই তিনটা stage-এর অবিরাম repetition। উপরের সব software layer একসাথে যা করে, সেটা শেষে এই তিনটা stage-এই এসে দাঁড়ায়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Let's replay the full journey of that ADD instruction one more time.")}
            {p(<>Somewhere in memory sits a bit sequence — {mono('0001 001 010 011')}. Nobody knows what it is. Just a pattern of voltage.</>)}
            {p(<>But the PC holds that bit sequence's address. The clock ticks. <strong>Fetch</strong> begins. The CPU goes to that address, pulls the bits up, and seats them in the IR. At this very moment the PC increments on its own — now pointing at the next address.</>)}
            {p(<>The clock ticks again. <strong>Decode</strong> begins. The Control Unit looks at the first 4 bits in the IR and says — "ADD." Instantly, control signals spread across the CPU. The ALU switches to add mode. The Mux selects Register A and Register B. The Decoder primes Register C.</>)}
            {p(<>Another tick — <strong>Execute</strong>. 2 and 3 head into the ALU, 5 comes out, and it settles into Register C.</>)}
            {p("Three stages, one instruction complete. To the CPU it's just one heartbeat. And in this very moment — no pause — the PC is already pointing at the next instruction. It too will be fetched. Decoded. Executed.")}
            {p('Your React app. A YouTube video. Photoshop. An AI chatbot. Everything — literally everything — is the relentless repetition of these three stages. Whatever all the software layers above accomplish together, it all lands on these three stages in the end.')}
          </div>
        )}
      </Section>

      {/* Section 07 — reality corner: pipelining */}
      <Section num="07" bnH2="সবকিছু এত সরল নয়: Pipelining" enH2="Reality corner: pipelining">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p(<>বোঝার সুবিধার জন্য আমরা এখানে data ফ্লো-কে এমনভাবে দেখিয়েছি যেন একটি instruction-এর তিন ধাপ পুরোপুরি শেষ হওয়ার পর পরবর্তী instruction-এর কাজ শুরু হয়। একে বলে <strong>Single-Cycle Architecture</strong>।</>)}
            {p(<>কিন্তু বাস্তব আধুনিক প্রসেসরগুলো এভাবে অলস বসে থাকে না। সেখানে ব্যবহৃত হয় <strong>Pipelining</strong> মেকানিজম। একটি কারখানার অ্যাসেম্বলি লাইনের কথা ভাবুন — যেখানে একই সময়ে একটি গাড়িতে পেইন্ট করা হচ্ছে, তার পেছনের গাড়িতে চাকা লাগানো হচ্ছে, আর তারও পেছনের গাড়িটির বডি জোড়া দেওয়া হচ্ছে।</>)}
            {p('CPU-ও ঠিক এই কাজটিই করে। যখন একটি instruction Execute ধাপে থাকে, তখন তার ঠিক পরের instruction-টি প্রসেসরের Decode ধাপে প্রসেস হতে থাকে, এবং একই সময়ে মেমোরি থেকে তারও পরের instruction-টি Fetch হতে থাকে। নিচের যন্ত্রে দুই mode-এর তফাতটা tick করে দেখুন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p(<>To keep the concepts accessible, we mapped the data flow as a rigid sequential process where one instruction must complete its entire cycle before the next begins. This paradigm represents a classical <strong>Single-Cycle Architecture</strong>.</>)}
            {p(<>Modern production processors are far more dynamic, utilizing a technique called <strong>Pipelining</strong>. Think of an assembly line in a manufacturing plant: workers do not wait for a single car to be built, painted, and boxed before starting the next. Instead, multiple cars occupy different stages of the line simultaneously.</>)}
            {p('A pipelined CPU mirrors this efficiency. While Instruction 1 is inside the Execute block, Instruction 2 is simultaneously passing through the Decode block, and Instruction 3 is already being pulled from system memory during the Fetch stage. Tick through both modes on the instrument below:')}
          </div>
        )}

        <PipelineVisualizer />

        <Deeper
          bnLabel="আরেকটু গভীরে — superscalar, out-of-order, branch prediction"
          enLabel="go deeper — superscalar, out-of-order, branch prediction"
        >
          {bn ? (
            <div lang="bn" style={bodyStyle}>
              <p style={{ margin: '14px 0 12px' }}>Pipelining ছাড়াও মডার্ন প্রসেসরে আরও কিছু হাই-লেভেল আর্কিটেকচারাল মেকানিজম থাকে:</p>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.85 }}>
                <li style={{ marginBottom: 10 }}><strong>Superscalar:</strong> একই ক্লক সাইকেলে একাধিক সমান্তরাল পাইপলাইন ব্যবহার করে একসাথে কয়েকটা instruction এক্সিকিউট করা।</li>
                <li style={{ marginBottom: 10 }}><strong>Out-of-Order Execution:</strong> যদি দেখা যায় কোনো instruction-এর জন্য প্রয়োজনীয় data মেমোরি থেকে আসতে দেরি হচ্ছে, তবে CPU বসে না থেকে কোডের লাইনের ক্রম পরিবর্তন করে পরের ইন্ডিপেনডেন্ট instruction-টি আগে রান করে ফেলে।</li>
                <li><strong>Branch Prediction:</strong> কোডের ভেতরে কোনো if-else কন্ডিশন বা লুপ থাকলে, কন্ডিশনটি সত্যি নাকি মিথ্যা হবে তা প্রসেসর আগে থেকেই অনুমান (predict) করে স্পেকুলেটিভলি PC-র address লোড করে কাজ এগিয়ে রাখে। অনুমান ভুল হলে সেই কাজ বাতিল করে আবার সঠিক ট্র্যাকে ফিরে আসে।</li>
              </ul>
            </div>
          ) : (
            <div style={bodyStyle}>
              <p style={{ margin: '14px 0 12px' }}>Beyond pipelining, modern desktop and server chips deploy highly sophisticated execution strategies:</p>
              <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.85 }}>
                <li style={{ marginBottom: 10 }}><strong>Superscalar architecture:</strong> Multiple parallel hardware execution pipelines within a single core, executing multiple distinct instructions during the same clock cycle.</li>
                <li style={{ marginBottom: 10 }}><strong>Out-of-Order Execution (OoO):</strong> If an instruction is blocked waiting for data to arrive from slow system memory, the control logic bypasses it to execute subsequent, independent commands that already have their operands ready.</li>
                <li><strong>Branch Prediction:</strong> When encountering conditional logic (like if-else blocks or loops), the CPU speculatively guesses the execution outcome and pre-loads the PC with the predicted address path. If the guess is correct, execution speed scales dramatically; if it fails, the speculative work is flushed and the PC resets to the correct path.</li>
              </ul>
            </div>
          )}
        </Deeper>

        <Recap>
          {bn ? (
            <>
              <li>কোড ও data-র অভিন্নতা: মেমোরির কাছে কোড আর data-র গঠনে কোনো পার্থক্য নেই, দুটোই স্রেফ ভোল্টেজ বা bit সিকোয়েন্স।</li>
              <li>পার্থক্য গড়ে দেয় Program Counter: PC মেমোরির যে address-কে নির্দেশ করে, CPU সেই bit-গুলোকেই instruction হিসেবে treat করে।</li>
              <li>Control Unit হলো ডিরেক্টর: CU কোনো ম্যাথ করে না, সে instruction-এর opcode পড়ে ডিকোডারের মাধ্যমে সঠিক কন্ট্রোল সিগন্যাল জেনারেট করে বাকি পার্টসগুলোকে পরিচালনা করে।</li>
              <li>কম্পিউটিং-এর রিদম: প্রতিটি প্রসেসরের মূল প্রাণশক্তি লুকিয়ে আছে Fetch-Decode-Execute সাইকেলের অবিরাম লুপের মাঝে।</li>
            </>
          ) : (
            <>
              <li>Uniform data storage: Instructions and variables share the same hardware format in memory — both are simply physical voltage patterns without inherent contextual labels.</li>
              <li>The Program Counter draws the line: The hardware treats a bit sequence as a command solely because the PC pointed to it during a command phase.</li>
              <li>The Control Unit is the orchestrator: The CU interprets the Opcode bit fields and uses internal hardware decoders to toggle the control signals that guide the ALU, multiplexers, and buses.</li>
              <li>The computational engine: The Fetch-Decode-Execute cycle acts as the fundamental heartbeat of modern computing architecture.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={{ label: { bn: 'সিরিজ hub', en: 'series hub' }, title: 'The Machine Beneath Your Code', href: '/writing/tech-articles', variant: 'hub' }}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৫ — মেমোরি হায়ারার্কি' : '05 — The Memory Hierarchy', href: '#', variant: 'next' }}
        bridge={{
          bn: 'এই যে কোটি কোটি instruction আর data নিয়ে প্রসেসর প্রতি ন্যানোসেকেন্ডে খেলা করছে, এগুলো আসলে থাকে কোথায়? CPU-র ভেতরের register-গুলো অত্যন্ত ফাস্ট হলেও সেখানে জায়গা খুবই সীমিত — মাত্র কয়েক হাজার bit। এত ছোট জায়গায় তো আমাদের গেম, ব্রাউজার কিংবা অপারেটিং সিস্টেম ধরবে না। তাহলে কি সব data র‍্যামে (RAM) থাকে? কিন্তু র‍্যাম তো প্রসেসরের তুলনায় অনেক দূরে এবং ধীরগতির। এই স্পিড আর সাইজের ব্যালেন্স বজায় রাখার জন্য মডার্ন কম্পিউটারে একটি চতুর ব্যবস্থা করা হয়েছে — প্রসেসরের এই মেমোরি ম্যানেজমেন্টের গল্পটাই হবে আমাদের পরের আর্টিকেলের বিষয়।',
          en: "We have established that the processor manipulates instructions and data at nanosecond intervals — but where does all this state live? While internal registers operate at maximum speed, they offer incredibly scarce storage space — typically just a few thousand bits. That's nowhere near enough capacity to house modern operating systems, browsers, or applications. Is everything stored in RAM, then? System RAM is spacious, but it sits physically distant from the CPU core, making it far too slow to keep up with the ALU. To solve this speed and capacity bottleneck, modern computer engineering implements a layered approach — and that memory management story is the focus of our next breakdown.",
        }}
      />
      <Colophon />
    </article>
  );
}
