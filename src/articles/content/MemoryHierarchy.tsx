import type { ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';
import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Deeper } from '../primitives/Deeper';
import { Recap } from '../primitives/Recap';
import { RelayNav } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { MemoryPyramid } from '../widgets/MemoryPyramid';
import { LatencyScale } from '../widgets/LatencyScale';
import { CacheLineLocality } from '../widgets/CacheLineLocality';
import { RowColumnTraversal } from '../widgets/RowColumnTraversal';
import { SRAMvsDRAM } from '../widgets/SRAMvsDRAM';
import { MemoryLookupCascade } from '../widgets/MemoryLookupCascade';

const LINK = { color: '#00753F' };

export function MemoryHierarchy() {
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

  const codeBlock = (s: string) => (
    <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '12.5px', background: '#232b23', color: '#00d26a', padding: '15px 20px', margin: '0 0 20px', overflowX: 'auto', border: '1px solid #4a493a' }}>
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
            {p('আপনার laptop-এ কি একটাই memory আছে?')}
            {p('স্বাভাবিক উত্তর — হ্যাঁ, RAM। ১৬ GB বা ৩২ GB, যা-ই হোক।')}
            {p('কিন্তু আসলে laptop-এ এই মুহূর্তে পাঁচ, ছয় বা কখনো সাত-আট রকমের memory একসাথে কাজ করছে। কিছু এত ছোট যে সবমিলিয়ে কয়েক kilobyte, কিন্তু এত দ্রুত যে CPU-র clock speed-এর সাথে তাল মিলিয়ে ডেটা আদান-প্রদান করতে পারে। কিছু এত বড় যে টেরাবাইট পর্যন্ত ধরে, কিন্তু তাদের কাছে পৌঁছাতে CPU-কে অপেক্ষা করতে হয় হাজার হাজার clock cycle।')}
            {p(<>কেন এই ব্যবস্থা? <a href="/writing/heartbeat-fde" style={LINK}>আগের আর্টিকেলে</a> দেখেছি register কীভাবে instruction আর ডেটা ধরে রাখে। কিন্তু কেন একটাই memory দিয়ে কাজ চালানো যায় না? এটাই আজকের গল্প।</>)}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Does your laptop have just one memory?')}
            {p('The natural answer — yes, RAM. 16 GB or 32 GB, whatever it is.')}
            {p("But actually, your laptop right now has five, six, sometimes seven or eight kinds of memory working at once. Some are so small they add up to just a few kilobytes total, but so fast they can keep pace with the CPU's clock speed. Some are so big they hold terabytes, but the CPU has to wait thousands of clock cycles to reach them.")}
            {p(<>Why this arrangement? In the <a href="/writing/heartbeat-fde" style={LINK}>last article</a>, we saw how a register holds instructions and data. But why can't we run everything off one kind of memory? That's today's story.</>)}
          </div>
        )}
      </div>

      <Section num="01" bnH2="কেন একটাই memory দিয়ে হয় না?" enH2="Why can't we just have one memory?">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('সোজা প্রশ্ন। একটাই বড়, দ্রুত memory বানিয়ে সব কাজ চালালে হতো না?')}
            {p('হতো, যদি সেটা সস্তায় পাওয়া যেত।')}
            {p('Memory design-এর একটা fundamental trilemma আছে। আমরা তিনটা জিনিস চাই একসাথে — দ্রুততা (speed), ধারণক্ষমতা (capacity), আর কম দাম (low cost)। কিন্তু একই memory-তে এই তিনটার সবগুলো কখনো পাওয়া যায় না। যেকোনো দুইটা পাবেন, তৃতীয়টা ছাড়তে হবে।')}
            <ul style={ulStyle}>
              <li>খুব দ্রুত + বড় = ভয়ানক দামি (কেউ afford করতে পারবে না)</li>
              <li>খুব দ্রুত + সস্তা = ছোট (কম জায়গা, কম ডেটা)</li>
              <li>বড় + সস্তা = ধীর (RAM, disk)</li>
            </ul>
            {p('এই trilemma-র কারণেই এক memory-তে সব সম্ভব না। তাই engineering-এর একটা চতুর সমাধান — hierarchy। একটা মাত্র memory না। বহু layer, একটার পর একটা।')}
            {p('সবচেয়ে দ্রুত layer সবার ওপরে — কিন্তু এতই ছোট যে শুধু কিছু ডেটা রাখা যায়। তার নিচে একটু বড়, একটু ধীর। তার নিচে আরও বড়, আরও ধীর। এভাবে নামতে নামতে সবার নিচে সবচেয়ে বড়, সবচেয়ে ধীর memory — যেখানে কমবেশি সবকিছু জমা রাখা সম্ভব।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Simple question. Why not just build one big, fast memory and use it for everything?')}
            {p('You could, if it were affordable.')}
            {p("There's a fundamental trilemma in memory design. You want three things at once — High Speed, Large Capacity, and Low Cost. But no single memory ever gives you all three. You get any two; the third you have to give up.")}
            <ul style={ulStyle}>
              <li>Very Fast + Large Capacity = Extremely Expensive (cost-prohibitive for consumer hardware)</li>
              <li>Very Fast + Low Cost = Small Capacity (extremely limited footprint)</li>
              <li>Large Capacity + Low Cost = High Latency (DRAM, storage media)</li>
            </ul>
            {p('Because of this trilemma, a single unified memory is engineeringly unfeasible. The solution is hierarchy: rather than one uniform pool, memory is organized into progressive, stacked layers.')}
            {p('The fastest layer sits at the top — but it is small enough to hold only immediate data. Below it lies a slightly larger, slightly slower layer. Below that, larger and slower still. Descending down the stack, the largest and highest-latency storage sits at the bottom.')}
          </div>
        )}
      </Section>

      <Section num="02" bnH2="Layer-গুলো একটু কাছ থেকে" enH2="The layers, up close">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('আপনার laptop-এ এই মুহূর্তে যেসব memory কাজ করছে:')}
            <ul style={ulStyle}>
              <li><strong>Register</strong> — CPU-র একদম ভেতরে। আকার সবমিলিয়ে কয়েক হাজার bit। Speed এক clock cycle। CPU এই মুহূর্তে যা নিয়ে কাজ করছে — সব এখানে।</li>
              <li><strong>L1 Cache</strong> — CPU-র ভেতরেই, প্রতিটা core-এর জন্য আলাদা। আকার 32-64 KB। Speed 4-5 clock cycles। দুই ভাগে বিভক্ত — L1i (instruction) আর L1d (data)।</li>
              <li><strong>L2 Cache</strong> — এটাও CPU-র ভেতরে, প্রতি core-এর জন্য আলাদা। আকার 256 KB থেকে 1 MB। Speed 3-10 clock cycle।</li>
              <li><strong>L3 Cache</strong> — সব core-এর মধ্যে shared। আকার 4 থেকে 64 MB। Speed 10-30 clock cycle।</li>
              <li><strong>RAM (Main Memory)</strong> — CPU-র বাইরে, motherboard-এ। আকার 8-32 GB, কখনো আরও বেশি। Speed 100-300 clock cycle।</li>
              <li><strong>SSD/HDD</strong> — Non-volatile storage। আকার 256 GB থেকে অনেক TB পর্যন্ত। Speed 100,000-এর বেশি clock cycle।</li>
            </ul>
            {p('সবমিলিয়ে ছয় বা সাত layer। উপর থেকে নিচে — ছোট থেকে বড়, দ্রুত থেকে ধীর, দামি থেকে সস্তা। নিচের যন্ত্রে একেকটা layer-এ চাপ দিয়ে তার আকার আর গতি দেখুন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Here are the memories running in your laptop right now:")}
            <ul style={ulStyle}>
              <li><strong>Register</strong> — right inside the CPU. Total size a few thousand bits. Speed: one clock cycle. Whatever the CPU is working on right now lives here.</li>
              <li><strong>L1 Cache</strong> — inside the CPU, separate for each core. Size 32-64 KB. Speed 4-5 clock cycles. Split into two parts — L1i (instructions) and L1d (data).</li>
              <li><strong>L2 Cache</strong> — also inside the CPU, separate for each core. Size 256 KB to 1 MB. Speed 3-10 clock cycles.</li>
              <li><strong>L3 Cache</strong> — shared across all cores. Size 4 to 64 MB. Speed 10-30 clock cycles.</li>
              <li><strong>RAM (Main Memory)</strong> — outside the CPU, on the motherboard. Size 8-32 GB, sometimes more. Speed 100-300 clock cycles.</li>
              <li><strong>SSD/HDD</strong> — storage. Size 256 GB to many TB. Speed 100,000+ clock cycles.</li>
            </ul>
            {p('Six or seven layers in total. Top to bottom — small to big, fast to slow, expensive to cheap. Tap a layer on the instrument below to see its size and speed:')}
          </div>
        )}
        <MemoryPyramid />
      </Section>

      <Section num="03" bnH2="Register access যদি ১ সেকেন্ড হতো" enH2="Standing on the one-second scale">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('সংখ্যাগুলো একটু abstract লাগতে পারে। "1 clock cycle" আর "100 clock cycle"-এর পার্থক্য মাথায় ধরানো সহজ না।')}
            {p('একটা comparison দিয়ে ভাবা যাক। ধরুন register access করতে যদি ১ সেকেন্ড লাগে, তাহলে বাকিদের অবস্থাটা এমন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('The raw cycle counts can feel abstract. The real-world difference between a 1-cycle access and a 200-cycle fetch is hard to visualize without a human scale.')}
            {p('If we scale a 1-register access to equal 1 human second, the relative latencies across the stack look like this:')}
          </div>
        )}
        <LatencyScale />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এই স্কেলে দাঁড়িয়ে ভাবুন: CPU যদি প্রতিটা data-র জন্য সরাসরি storage বা RAM-এর ওপর নির্ভর করত, তবে একেকটা গাণিতিক অপারেশনের মাঝখানে তাকে মিনিটের পর মিনিট নিষ্ক্রিয় বসে থাকতে হতো (একে বলে CPU Stall)। তাই দ্রুততম memory-কে প্রসেসরের যতটা সম্ভব কাছাকাছি রাখা এত গুরুত্বপূর্ণ।')}
            {p('কিন্তু একটা প্রশ্ন থেকে যায়। যদি সব ডেটা L1 বা L2 cache-এ ধরত, তাহলে সমস্যা মিটে যেত। কিন্তু L1 তো মাত্র 64 KB। এত অল্প জায়গায় পুরো program-এর ডেটা রাখা অসম্ভব। তাহলে কোন ডেটা fast cache-এ থাকবে, কোনটা RAM-এ পড়ে থাকবে?')}
            {p('এখানেই আসে locality-র concept। এবং এই একটা idea-ই পুরো hierarchy-কে কাজ করায়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Viewed through this lens: if the CPU had to fetch every piece of data directly from storage or RAM, it would spend virtually all its operating life stalled waiting for data — a CPU Stall. That is why keeping the fastest memory as close to the processor as possible matters so much.')}
            {p("But there's still a question. If all data lived in L1 or L2 cache, all problems would be solved. But L1 is only 64 KB — no way to fit a whole program's data in that little space. How does the hardware decide which data sits in fast cache and which stays back in RAM?")}
            {p('This is where the concept of locality comes in. This one idea is what makes the entire hierarchy work.')}
          </div>
        )}
      </Section>

      <Section num="04" bnH2="Locality: কেন এই ব্যবস্থা কাজ করে" enH2="Locality: why this arrangement works">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('প্রোগ্রাম কীভাবে memory access করে, সেটা random না। প্রোগ্রাম যখন একটা variable access করে, একটু পরে সেটাকে আবার access করার সম্ভাবনা অনেক বেশি। যখন array-এর index 5 access করে, পরের access-এ সাধারণত সে index 6 চাইবে — index 500 না।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>এই দুই pattern-এর নাম <Term id="locality">locality</Term>।</p>
            {p('Temporal locality — সময়ের locality। এই মুহূর্তে যে ডেটা access হচ্ছে, কয়েক মুহূর্ত পর সেটাকে আবার access করার সম্ভাবনা অনেক বেশি। for loop-এর counter variable, কোনো recursive function-এর argument, বা বার বার কল হওয়া কোনো method — এগুলো ঘন ঘন access হয়।')}
            {p('Spatial locality — জায়গার locality। এই মুহূর্তে যে address access হচ্ছে, তার আশেপাশের address-এও access-এর সম্ভাবনা বেশি। Array traverse করলে, struct-এর field access করলে, string-এর character পড়লে — সব একটার পাশের অন্যটা।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>CPU যখন RAM থেকে ১টি byte দাবি করে, memory controller শুধু সেই ১টি byte পাঠায় না। সে তার সাথে পুরো 64-byte-এর একটা ব্লক একবারে তুলে নিয়ে আসে cache-এ। এই 64-byte ব্লককে বলা হয় <Term id="cacheline">cache line</Term>।</p>
            {p('Spatial locality-র কারণে, আপনি যখন array-এর index[0] রিড করেন, পুরো cache line-এ index[0] থেকে index[15] (4-byte integer হলে) পর্যন্ত cache-এ চলে আসে। ফলে পরের ১৫টি iteration-এ CPU-কে আর ধীরগতির RAM-এ যেতেই হয় না। নিচের যন্ত্রে address-এ চাপ দিয়ে দেখুন কীভাবে পুরো line একসাথে চলে আসে:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("The way programs access memory isn't random. When a program accesses a variable, it's very likely to access that variable again soon. When it accesses index 5 of an array, the next access is usually index 6 — not index 500.")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>These two patterns have a name — <Term id="locality">locality</Term>.</p>
            {p("Temporal locality — locality in time. Data being accessed right now is very likely to be accessed again a few moments later. A for-loop's counter, a recursive function's argument, a frequently invoked method — these get accessed constantly.")}
            {p('Spatial locality — locality in space. An address being accessed right now is very likely to have its neighbors accessed too. Traversing an array, accessing struct fields, reading through a string — everything sits next to another.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>When the CPU requests a single byte from RAM, the memory controller does not transfer a single byte over the bus. Instead, it reads and transfers an entire aligned 64-byte block known as a <Term id="cacheline">cache line</Term>.</p>
            {p("Because of spatial locality, when you read index[0] of an array, the whole cache line brings index[0] through index[15] along with it (for 4-byte integers). For the next 15 iterations, the CPU never even needs to visit slow RAM. Tap an address on the instrument below and watch the whole line arrive together:")}
          </div>
        )}
        <CacheLineLocality />

        <h3 style={h3Style}>{bn ? 'কোড লেভেলে প্রভাব: Row-Major vs Column-Major' : 'Code-level impact: row-major vs. column-major'}</h3>
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('Memory hierarchy কেবল হার্ডওয়্যার ইঞ্জিনিয়ারদের মাথাব্যথার কারণ নয় — হাই-লেভেল সফটওয়্যার পারফরম্যান্সেও এর সরাসরি প্রভাব আছে।')}
            {p('C বা C++-এর মতো ভাষায় 2D array মেমরিতে মূলত row-major order-এ পর পর সাজানো থাকে — প্রথম সারির সব উপাদান পাশাপাশি বসে, তার ঠিক পরপরই দ্বিতীয় সারির উপাদান বসে।')}
            {p('নিচের দুটি loop লক্ষ করুন। দুটোই একই matrix-এর সব উপাদানের যোগফল বের করে, কিন্তু পারফরম্যান্স সম্পূর্ণ ভিন্ন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Memory hierarchy is not merely a hardware concern — it directly governs software performance too.')}
            {p('Languages like C/C++ lay out multidimensional arrays in row-major order in contiguous memory — elements of a row sit in adjacent addresses, followed immediately by the next row.')}
            {p('Consider two functions summing the exact same matrix, but with different loop order:')}
          </div>
        )}
        {codeBlock(`#define SIZE 2048
int matrix[SIZE][SIZE];

// Approach A: Cache-Friendly (Row-Major Traversal)
long long sumA = 0;
for (int i = 0; i < SIZE; i++) {
    for (int j = 0; j < SIZE; j++) {
        sumA += matrix[i][j]; // contiguous memory access
    }
}

// Approach B: Cache-Hostile (Column-Major Traversal)
long long sumB = 0;
for (int j = 0; j < SIZE; j++) {
    for (int i = 0; i < SIZE; i++) {
        sumB += matrix[i][j]; // large-stride jumps
    }
}`)}
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Approach A ({mono('matrix[i][j]')}):</strong> Inner loop-এ index {mono('j')} বাড়ে, তাই পাশাপাশি memory address পড়া হয়। {mono('matrix[0][0]')} access করলে পুরো 64-byte cache line লোড হয়ে যায়, যাতে {mono('matrix[0][1]')}, {mono('matrix[0][2]')} আগে থেকেই থাকে। পরের প্রতিটা read একটা cache HIT।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Approach B ({mono('matrix[i][j]')}):</strong> Inner loop-এ index {mono('i')} বাড়ে, মানে প্রতি ধাপে {mono('SIZE * sizeof(int)')} byte (~৮ KB) দূরে লাফ দিতে হয়। এই লাফের নাম stride। প্রতিবার নতুন cache line লাগে — প্রায় প্রতিটা access-ই একটা cache MISS।</p>
            {p('এ কারণেই array traversal সবসময় linked list-এর চেয়ে দ্রুত, Redis কেন in-memory হয়ে এত কম latency দেয়, আর কেন matrix multiplication অপটিমাইজ করতে cache blocking ব্যবহার করা হয়। নিচের যন্ত্রে দুই mode toggle করে hit/miss গুনে দেখুন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Approach A ({mono('matrix[i][j]')}):</strong> The inner loop increments {mono('j')}, reading memory sequentially. Accessing {mono('matrix[0][0]')} loads a 64-byte cache line that pre-populates {mono('matrix[0][1]')}, {mono('matrix[0][2]')}, and so on. Every subsequent read is an immediate cache HIT.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Approach B ({mono('matrix[i][j]')}):</strong> The inner loop increments {mono('i')}, forcing a jump of {mono('SIZE * sizeof(int)')} bytes (~8 KB) on every iteration — a large stride. Because the address leaps outside the active cache line, nearly every single access is a cache MISS.</p>
            {p('This is why sequential array traversal beats linked-list pointer-chasing, why in-memory stores like Redis deliver such low latency, and why matrix multiplication gets optimized with cache blocking. Toggle the two modes below and watch the hit/miss count:')}
          </div>
        )}
        <RowColumnTraversal />
      </Section>

      <Section num="05" bnH2="SRAM আর DRAM: ভেতরে পার্থক্য কী?" enH2="SRAM vs. DRAM: what's different inside?">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('L1, L2, L3 cache আর RAM — সবই semiconductor memory। কিন্তু ভেতরের transistor বিন্যাসে বড় ফারাক আছে।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>SRAM (Static RAM):</strong> প্রতি ১-bit ডেটা ধরে রাখতে ৬টি transistor দিয়ে তৈরি একটা flip-flop latch circuit ব্যবহার হয়। কোনো চার্জ leak-এর ঝামেলা নেই, অত্যন্ত দ্রুত। কিন্তু ৬টি transistor অনেক বেশি জায়গা নেয়, দাম বেশি — তাই শুধু CPU cache-এ অল্প পরিমাণে ব্যবহার হয়।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>DRAM (Dynamic RAM):</strong> প্রতি ১-bit ডেটার জন্য মাত্র ১টি transistor আর ১টি ক্ষুদ্র capacitor ব্যবহার হয়। Density মারাত্মক বেশি — কোটি কোটি bit বসানো যায়, তাই সস্তা। কিন্তু capacitor একটা চার্জ ধরে রাখা বালতির মতো, যার electron সময়ের সাথে leak হয়ে যায়। তাই প্রতি ৬৪ millisecond-এর মধ্যে প্রতিটা cell-কে অন্তত একবার refresh করতে হয় (উচ্চ তাপমাত্রায় ৩২ ms) — এই refresh cycle-ই DRAM-কে SRAM-এর চেয়ে ধীর করে দেয়।</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('L1/L2/L3 caches and system RAM are all semiconductor memory, but their internal transistor layouts differ significantly.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>SRAM (Static RAM):</strong> uses a 6-transistor flip-flop latch circuit per bit. No charge-leakage problem, extremely fast. But six transistors take up far more space and cost far more to manufacture — so it's used sparingly, only inside CPU caches.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>DRAM (Dynamic RAM):</strong> uses just one transistor and one tiny capacitor per bit. Density is enormous — billions of bits fit on a chip, so it's cheap. But a capacitor is like a bucket holding charge, and its electrons leak away over time. Every cell must be refreshed at least once within a 64-millisecond window (32 ms at high temperature) — and that refresh cycle is exactly what makes DRAM slower than SRAM.</p>
          </div>
        )}
        <SRAMvsDRAM />
      </Section>

      <Section num="06" bnH2="Volatility: power গেলে কী হয়?" enH2="Volatility: what happens when power fails?">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('মেমরি layer-গুলোর মধ্যে স্থায়িত্বের ভিত্তিতে একটা মৌলিক বিভাজন আছে।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Volatile memory:</strong> Register, L1/L2/L3 cache, আর RAM। বিদ্যুৎ সরবরাহ বন্ধ হওয়ার সাথে সাথেই এদের ভেতরের সব charge আর flip-flop-এর voltage state শূন্য হয়ে যায় — সব ডেটা মুছে যায়।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Non-volatile storage:</strong> SSD আর HDD। বিদ্যুৎ ছাড়াও ডেটা ধরে রাখতে পারে, কিন্তু গঠন সম্পূর্ণ ভিন্ন:</p>
            <ul style={ulStyle}>
              <li><strong>HDD:</strong> একটা metallic platter-এর ওপর magnetic field (North/South orientation) হিসেবে ০ আর ১ সংরক্ষিত হয়। Physical read/write head স্পিন করে ডেটা লেখে বা পড়ে।</li>
              <li><strong>SSD:</strong> কোনো নড়াচড়া করার যন্ত্রাংশ নেই। NAND Flash Memory দিয়ে তৈরি — Floating Gate Transistor-এর ভেতরের insulator স্তরের মাঝে electron আটকে রাখা হয় (electron tunneling)। একবার electron ট্র্যাপড হলে বিদ্যুৎ ছাড়াই বছরের পর বছর সেই state ধরে থাকে।</li>
            </ul>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('There is a fundamental split across memory layers based on how they retain state.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Volatile memory:</strong> registers, L1/L2/L3 cache, and RAM. The moment power is cut, all charge and flip-flop voltage states collapse to zero — every bit of data is gone.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Non-volatile storage:</strong> SSD and HDD. They retain data without power, but their structure is completely different:</p>
            <ul style={ulStyle}>
              <li><strong>HDD:</strong> stores 0s and 1s as magnetic field orientations (north/south) on a metallic platter. A physical read/write head spins to write or read the data.</li>
              <li><strong>SSD:</strong> no moving parts at all. Built from NAND Flash Memory — electrons are trapped inside the insulated floating gate of a transistor (electron tunneling). Once trapped, those electrons hold that state for years without any power.</li>
            </ul>
          </div>
        )}
      </Section>

      <Section num="07" bnH2="পুরো ছবিটা একবার" enH2="The complete lookup, once through">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('কল্পনা করা যাক CPU কোনো একটা instruction পালনের জন্য একটা নির্দিষ্ট memory address-এর ডেটা চাইল:')}
            <ul style={ulStyle}>
              <li><strong>Register check:</strong> CPU প্রথমে নিজের register চেক করে। পেলে সাথে সাথে ব্যবহার করে।</li>
              <li><strong>L1, L2, L3 lookup:</strong> না পেলে L1 cache-এ যায়। সেখানে না থাকলে (miss) L2, তারপর L3 স্ক্যান করে।</li>
              <li><strong>RAM access:</strong> L3-তেও না থাকলে system bus পেরিয়ে RAM-এ যায়। ডেটা পেলে সেই 64-byte cache line L3, L2 পার হয়ে L1 আর register-এ রিফিল হয়।</li>
              <li><strong>Page fault (storage access):</strong> RAM-এও না থাকলে (virtual memory page fault) operating system সিগন্যাল পায়, drive থেকে (SSD/HDD) ব্লক এনে RAM-এ লোড করে। এই সময় CPU লক্ষ লক্ষ cycle অলস বসে থাকে।</li>
            </ul>
            {p('এই কারণেই ভালো developer memory hierarchy-র দিকে খেয়াল রাখে — array-এ locality maintain করে, random access কম করে, ছোট কাজের ডেটা cache-fit রাখার চেষ্টা করে। নিচের যন্ত্রে data কোথায় পাওয়া গেল সেটা বেছে নিয়ে পুরো cascade-টা দেখুন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Picture the CPU requesting data at a specific memory address to carry out an instruction:')}
            <ul style={ulStyle}>
              <li><strong>Register check:</strong> the CPU checks its own registers first. Found it, execution proceeds instantly.</li>
              <li><strong>L1, L2, L3 lookup:</strong> on a miss, it queries L1 cache, then L2, then shared L3.</li>
              <li><strong>RAM access:</strong> on an L3 miss, a request crosses the system bus to RAM. When the block arrives, that 64-byte cache line refills L3, L2, L1, and the register.</li>
              <li><strong>Page fault (storage access):</strong> if the page isn't even in RAM (a virtual memory page fault), the OS gets signaled and loads the block off the drive (SSD/HDD) — the CPU idles for millions of cycles during this.</li>
            </ul>
            {p('This is exactly why good developers pay attention to memory hierarchy — maintaining locality in arrays, minimizing random access, keeping small working sets cache-fit. Pick where the data turns up on the instrument below and watch the whole cascade:')}
          </div>
        )}
        <MemoryLookupCascade />
      </Section>

      <Section num="08" bnH2="আধুনিক প্রসেসরের বাস্তব জটিলতা: Cache Coherence" enH2="Modern CPU realities: cache coherence">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('বাস্তব প্রসেসরে memory hierarchy চালানো আরও চ্যালেঞ্জিং, বিশেষ করে modern multi-core CPU-তে।')}
            {p('একটা প্রসেসরে যদি ৮টা core থাকে, তবে ৮টা core-এর আলাদা আলাদা L1 আর L2 cache থাকে। Core 1 যদি তার L1 cache-এ থাকা কোনো variable-এর মান বদলে X = 5 থেকে X = 10 করে দেয়, আর একই সময়ে Core 2 যদি তার নিজস্ব L1 cache থেকে X-এর মান পড়তে চায় — সে তো পুরনো মান X = 5 পাবে!')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Running the memory hierarchy in real processors is even more challenging, especially on modern multi-core CPUs.')}
            {p('If a processor has 8 cores, each core has its own private L1 and L2 caches. If Core 1 modifies a variable in its own L1 cache from X = 5 to X = 10, and at the same moment Core 2 reads X from its own local L1 cache — it gets the stale value, X = 5!')}
          </div>
        )}
        <Deeper
          bnLabel="আরেকটু গভীরে — MESI protocol"
          enLabel="go deeper — the MESI protocol"
        >
          {bn ? (
            <p lang="bn" style={{ fontFamily: "'Anek Bangla','Anek Latin',sans-serif", margin: 0 }}>
              এই সমস্যা সমাধান করতে প্রসেসর লেভেলে <Term id="cachecoherence">cache coherence</Term> protocol (যেমন MESI: Modified, Exclusive, Shared, Invalid) কাজ করে। যখনই কোনো core তার স্থানীয় cache-এ কোনো ডেটা পরিবর্তন করে, সে একটা bus বার্তা পাঠিয়ে বাকি সব core-এর cache-এ থাকা ওই line-এর কপিকে সাথে সাথে "Invalid" ঘোষণা করে দেয়।
            </p>
          ) : (
            <p style={{ fontFamily: "'Anek Latin',sans-serif", margin: 0 }}>
              To prevent this, processors enforce a <Term id="cachecoherence">cache coherence</Term> protocol (like MESI: Modified, Exclusive, Shared, Invalid). Whenever a core writes to a cached address, it broadcasts an invalidation signal over the internal interconnect, instantly marking the matching line "Invalid" in every other core's cache.
            </p>
          )}
        </Deeper>
      </Section>

      <Section num="09" bnH2="এই আর্টিকেলে কী শিখলাম" enH2="What this article covered">
        <Recap>
          {bn ? (
            <>
              <li>এক memory দিয়ে কাজ হয় না — speed, capacity, cost-এর মধ্যে trade-off আছে, তাই hierarchy দরকার।</li>
              <li>Cache কাজ করে locality-র কারণে — প্রোগ্রাম random access করে না, যা এখন লাগছে তার আশপাশও শীঘ্রই লাগবে।</li>
              <li>Cache line হলো hierarchy-র মূল ingredient — ডেটা byte-by-byte না, chunk হিসেবে move করে।</li>
              <li>SRAM দ্রুত কিন্তু ৬-transistor-এর কারণে বড় ও ব্যয়বহুল; DRAM ঘন ও সস্তা, কিন্তু capacitor refresh-এর কারণে ধীর।</li>
              <li>Volatile আর non-volatile-এর পার্থক্য physical — flip-flop বা capacitor বিদ্যুৎ ছাড়া state রাখতে পারে না, কিন্তু trapped electron বা magnetic pattern পারে।</li>
            </>
          ) : (
            <>
              <li>One memory doesn't do it all — there's a trade-off between speed, capacity, and cost, so hierarchy is needed.</li>
              <li>Cache works because of locality — programs don't access randomly; what's needed now, its neighbors will be needed soon too.</li>
              <li>The cache line is the hierarchy's core ingredient — data moves in chunks, not byte-by-byte.</li>
              <li>SRAM is fast but its 6-transistor cell makes it big and expensive; DRAM is dense and cheap, but capacitor refresh cycles make it slower.</li>
              <li>The volatile vs. non-volatile split is physical — flip-flops and capacitors can't hold state without power, but trapped electrons and magnetic patterns can.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={{ label: { bn: 'সিরিজ hub', en: 'series hub' }, title: 'The Machine Beneath Your Code', href: '/writing/tech-articles', variant: 'hub' }}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৬ — অপারেটিং সিস্টেম: মহাব্যবস্থাপক' : '06 — Operating System: The Grand Conductor', href: '/writing/os-grand-conductor', variant: 'next' }}
        bridge={{
          bn: 'এখন পর্যন্ত সব দেখা হয়েছে hardware level-এ। CPU, register, cache, RAM, disk — সব physical component। কিন্তু বাস্তবে laptop-এ একই সাথে ৫০টা program চলছে। Browser, Spotify, VS Code, video call, terminal — সব একই RAM, একই CPU share করছে। কে ঠিক করে কে কখন কতটুকু resource পাবে? কে ঠিক করে কোন program-এর ডেটা memory-র কোন address-এ থাকবে? এইখানে আসে Operating System — hardware-এর ওপরে সবচেয়ে গুরুত্বপূর্ণ software layer। পরের আর্টিকেলে সেই গল্প।',
          en: "Up till now everything's been at the hardware level — CPU, register, cache, RAM, disk, all physical. But in reality your laptop runs 50 programs at once. Browser, Spotify, VS Code, a video call, a terminal — all sharing the same RAM, the same CPU. Who decides who gets how much, and when? Who decides which address a program's data lives at? This is where the Operating System comes in — the most important software layer above the hardware. That's the next article's story.",
        }}
      />
      <Colophon />
    </article>
  );
}
