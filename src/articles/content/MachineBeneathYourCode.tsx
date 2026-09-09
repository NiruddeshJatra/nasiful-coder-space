import { useLang } from '../context/LanguageContext';
import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { RelayNav, SERIES_HUB_CARD } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { AbstractionStack } from '../widgets/AbstractionStack';
import { ProtagonistDisguises } from '../widgets/ProtagonistDisguises';

export function MachineBeneathYourCode() {
  const { bn } = useLang();

  const bodyStyle = bn
    ? { fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }
    : { fontFamily: "'Anek Latin',sans-serif" };

  const p = (s: string) => <p style={{ margin: '0 0 16px', ...bodyStyle }}>{s}</p>;
  const pre = (s: string) => (
    <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '14.5px', background: '#232b23', color: '#00d26a', padding: '15px 20px', margin: '0 0 20px', overflowX: 'auto', border: '1px solid #4a493a' }}>{s}</pre>
  );

  const roadmap = [
    {
      level: bn ? 'LEVEL 1 · THE ATOMS — বিটের জগৎ' : 'LEVEL 1 · THE ATOMS — inside a bit',
      items: [
        { num: bn ? '০১' : '01', title: bn ? 'Bit-এর ভেতরে কী থাকে?' : "What's inside a bit?", desc: bn ? 'একটা bit কি বিমূর্ত ধারণা, নাকি এর একটা physical রূপ আছে? Voltage, transistor, আর memory-র সাথে bit-এর সম্পর্ক কি?' : "Is a bit just an abstract idea, or does it have a physical form? Voltage, transistors, and the birth of memory." },
        { num: bn ? '০২' : '02', title: bn ? 'যেকোনো তথ্য কীভাবে ০ আর ১ হয়?' : 'How does the world become zeros and ones?', desc: bn ? 'একটা "A" অক্ষর, একটা ছবির pixel — সবই শেষমেশ ০ আর ১। কিন্তু কীভাবে?' : 'A letter "A", a pixel — all ending up as 0s and 1s. But how?' },
      ],
    },
    {
      level: bn ? 'LEVEL 2 · THE MACHINERY — যন্ত্রের গল্প' : "LEVEL 2 · THE MACHINERY — the machine's story",
      items: [
        { num: bn ? '০৩' : '03', title: bn ? 'CPU-র blueprint' : "The CPU's blueprint", desc: bn ? 'একটা processor-এর ভেতরে আসলে কী কী অংশ থাকে?' : 'What parts actually live inside a processor?' },
        { num: bn ? '০৪' : '04', title: 'Heartbeat: Fetch-Decode-Execute', desc: bn ? 'CPU একটা instruction পেয়ে কী করে?' : 'The CPU gets an instruction — what happens?' },
        { num: bn ? '০৫' : '05', title: 'Memory Hierarchy', desc: bn ? 'Register থেকে RAM, RAM থেকে SSD — কেন এত ধরনের memory?' : 'Register to RAM to SSD — why so many kinds of memory?' },
      ],
    },
    {
      level: bn ? 'LEVEL 3 · THE BRIDGES — যেখানে সব মেলে' : 'LEVEL 3 · THE BRIDGES — where everything meets',
      items: [
        { num: bn ? '০৬' : '06', title: bn ? 'Operating System — Grand Conductor' : 'Operating System — the Grand Conductor', desc: bn ? 'একটা মেশিনে ৫০টা program একসাথে চলে কীভাবে?' : 'How does one machine run 50 programs at once?' },
        { num: bn ? '০৭' : '07', title: bn ? 'কোড থেকে মেশিন কোড' : 'From code to machine code', desc: bn ? 'আপনি JavaScript লিখলেন। CPU তো JavaScript বোঝে না। মাঝখানে কী ঘটে?' : "You wrote JavaScript. The CPU doesn't speak JavaScript. What happens in between?" },
        { num: bn ? '০৮' : '08', title: bn ? 'Key-press থেকে screen' : 'From keypress to screen', desc: bn ? "একটা 'A' চাপার পর screen-এ 'A' আসা পর্যন্ত পুরো relay race।" : "Pressing 'A' to seeing 'A' on screen — the full relay race." },
      ],
    },
  ];

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('ধরেন, কোডে লিখলাম:')}
            {pre('x = 5')}
            {p('কয়েক মিলিসেকেন্ড পরে আরেকটা লাইন রান হলো:')}
            {pre('print(x)')}
            {p('কম্পিউটার ঠিকই ৫ প্রিন্ট করল।')}
            {p('এখন প্রশ্ন হলো — এই কয়েক মিলিসেকেন্ড ধরে ৫ সংখ্যাটা ছিল কোথায়?')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>Screen-এ তো ছিল না। CPU-ও সারাক্ষণ ধরে বসে ছিল না। তাহলে? সিলিকন আর কপারের একটা physical board-এর ভেতরে ৫ সংখ্যাটা আসলে কোথায় ছিল?</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('You wrote:')}
            {pre('x = 5')}
            {p('A few milliseconds later:')}
            {pre('print(x)')}
            {p('The computer printed 5.')}
            {p("Question — where was that 5 during those milliseconds?")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>Not on the screen. Not held in the CPU the whole time. So where? On a physical board of silicon and copper, where exactly was that 5? (If you don't know that most of the components of digital electronics is made of a semiconductor material named Silicon, SAD!)</p>
          </div>
        )}
      </div>

      <Section num="01" bnH2="কেন এই সিরিজ" enH2="Why this series">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এই series পড়ে আপনি নতুন CPU design করতে পারবেন না। গাড়ির engine বোঝা মানেই কেউ Toyota-র কারখানা খুলে বসে না।')}
            {p('কিন্তু গাড়ি হঠাৎ থেমে গেলে, বা hood-এর নিচ থেকে ধোঁয়া উঠতে শুরু করলে — অন্তত বুঝবেন সমস্যাটা কোন দিকে খুঁজতে হবে।')}
            <p style={{ margin: '0 0 10px', ...bodyStyle }}>আপনি হয়তো এমন bug দেখেছেন:</p>
            <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...bodyStyle }}>
              <li>একই API local-এ ২০ms, production-এ ২s সময় নিচ্ছে</li>
              <li>সার্ভার হঠাৎ "Out of Memory" বলে ক্র্যাশ করেছে</li>
              <li>Chrome-এর একটা tab ৩GB RAM খেয়ে বসে আছে</li>
              <li>502 Bad Gateway। কোন gateway, কোথায়, কেন bad — কিচ্ছু বুঝা যাচ্ছে না</li>
            </ul>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>এগুলোর প্রত্যেকটার সমাধান এই series-এ দেব — এমন কোনো প্রতিশ্রুতি দিচ্ছি না। আমার ওই দক্ষতা বা জ্ঞান কোনোটাই এখনো হয়নি। কিন্তু এগুলোর পেছনে যে পৃথিবীটা কাজ করছে, সেটা আপনার কাছে অনেক কম রহস্যময় হয়ে যাবে বলে আশা করি।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>আজকালকার high-level language-এ কোড লেখার সময় আমরা পেছনের mechanism নিয়ে চিন্তা করি না। Browser, runtime, framework — সব পর্দার আড়ালে সামলে নেয়। এই আড়াল করাটাকে বলে <Term id="abstraction">abstraction</Term> — জটিল mechanism-কে একটা সহজ interface-এর পেছনে লুকিয়ে ফেলা।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>Abstraction আমাদের অসাধারণ productive করে। কিন্তু এর একটা দামও আছে। প্রতিটা abstraction-এর নিচে আরেকটা abstraction লুকিয়ে থাকে। কোনো একদিন যদি নিচের কোনো layer ভেঙে পড়ে — তখন সেখানে কী আছে সেটা মোটামুটি জানা থাকা দরকার। অন্তত একজন ভালো সিএসই পড়ুয়া ছাত্রের ন্যূনতম পরিষ্কার ধারণা রাখা উচিত আমার মতে, হোক না যুগ এখন Artificial Intelligence এর।</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("You won't be able to design a CPU after reading this. Understanding a car engine doesn't mean you can open a Toyota factory tomorrow.")}
            {p("But when the engine stops mid-highway, or smoke starts rising from under the hood — you'll at least know which direction to look.")}
            <p style={{ margin: '0 0 10px', ...bodyStyle }}>You've probably seen bugs like these:</p>
            <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9, ...bodyStyle }}>
              <li>An API that runs in 20ms locally but takes 2 seconds in production</li>
              <li>A server that crashes with "Out of Memory"</li>
              <li>A Chrome tab holding 3GB of RAM hostage</li>
              <li>502 Bad Gateway. Which gateway. Where. Why bad. Silence.</li>
            </ul>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>I'm not promising this series will solve each of those. I don't have that level of skill and knowledge yet. But I believe that the world underneath — the one that produces those symptoms — will become a lot less mysterious to you.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>When we write code in high-level languages today, we don't think about the machinery underneath. The browser, the runtime, the framework — everything is handled behind a curtain. That curtain has a name: <Term id="abstraction">abstraction</Term>. Hiding complex machinery behind a simple interface.</p>
            {p("Abstraction makes us wildly productive. But it has a cost. Every abstraction hides another abstraction underneath. And when one of those lower layers breaks — you at least need to know roughly what's down there. In my opinion, any decent CSE student must have a solid grasp of the fundamentals, even in the age of AI.")}
          </div>
        )}
        <AbstractionStack />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('বাংলাদেশের বিশ্ববিদ্যালয়ে computer science-এর hardware-related কোর্সগুলো বেশ কাঠখোট্টা। অন্তত আমার নিজের অভিজ্ঞতা তো এমনই ছিল। বইয়ে SR Latch, Virtual Memory, Cache — সব ছিল। স্যারেরাও কেমন যেন গৎবাঁধা উপায়ে পড়াতেন, মুখস্থ করা যেতো, কিন্তু আদৌ এগুলো কি বুঝায়, কানেকশন কই, আগামাথা খুঁজে পেতাম না। কিন্তু বাসায় ফিরে যখন Python-এ x = 5 লিখতাম, মনে হতো coding আর hardware দুইটা দুই জগতের বাসিন্দা।')}
            {p('অনেক পরে বুঝেছি — এগুলো আলাদা বিষয় না। একই গল্পের দুই প্রান্ত। এই series এ সেই মাঝখানের অংশটা দেখানোর চেষ্টা করবো।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Hardware-related computer science courses at Bangladeshi universities tend to be dry. At least mine was. Textbooks were full of SR Latches, Virtual Memory, Cache. But when I went home and wrote x = 5 in Python, I couldn't find a single connection between those two worlds.")}
            {p("I understood much later — they aren't separate subjects. They're two ends of the same story. This series is about the middle.")}
          </div>
        )}
      </Section>

      <Section num="02" bnH2="মূল চরিত্র কে?" enH2="Who's the main character?">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এই series-এ hardware, OS, compiler — কোনোটাই মূল চরিত্র না।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>মূল চরিত্র একটাই — <strong>information</strong>।</p>
            {p('একটা bit। একটা সংখ্যা। একটা keystroke। একটা instruction।')}
            {p('প্রতিটা article-এ আমরা এই information-এর পিছু নেব। এখন সে কোথায় আছে? কে তাকে ধরেছে? কীসে রূপান্তর হচ্ছে? পরে কোথায় যাচ্ছে?')}
            {p('এখানে যন্ত্র শুধু গল্পের background। মূল গল্পটা information-এর।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Hardware, OS, compiler — none of these are the protagonist of this series.")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>There's only one protagonist — <strong>information</strong>.</p>
            {p("A bit. A number. A keystroke. An instruction.")}
            {p("Every article follows this information as it moves. Where is it now? Who's holding it? What's transforming it?")}
            {p("The machine is just the setting. The story is about information.")}
          </div>
        )}
        <ProtagonistDisguises />
      </Section>

      <Section num="03" bnH2="রোডম্যাপ" enH2="Roadmap">
        {bn ? (
          <p lang="bn" style={{ margin: '0 0 20px', ...bodyStyle }}>পুরো যাত্রাটা ৮টা article-এ ভাগ করা:</p>
        ) : (
          <p style={{ margin: '0 0 20px', ...bodyStyle }}>The journey splits into 8 articles:</p>
        )}
        {roadmap.map((lv, li) => (
          <div key={li} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: "'Departure Mono',monospace", fontSize: '11.5px', color: '#00753F', letterSpacing: '0.08em', borderBottom: '1px solid #c9bda0', paddingBottom: 6, marginBottom: 0 }}>{lv.level}</div>
            {lv.items.map((it, ii) => (
              <div key={ii} style={{ display: 'flex', gap: 14, padding: '13px 0', borderBottom: '1px dashed #c9bda0' }}>
                <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: 12, color: '#7a7259', flexShrink: 0, width: 24 }}>{it.num}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: '16.5px', fontWeight: 600, color: '#26241C' }}>{it.title}</span>
                  <span style={{ display: 'block', fontFamily: "'Anek Bangla','Anek Latin',sans-serif", fontSize: '14.5px', lineHeight: 1.7, color: '#5c5442', marginTop: 2 }}>{it.desc}</span>
                </span>
              </div>
            ))}
          </div>
        ))}
      </Section>

      <Section num="04" bnH2="শেষে আপনি এই প্রশ্নগুলোর উত্তর দিতে পারবেন" enH2="By the end, you'll be able to answer">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 2 }}>
              <li>RAM আসলে কী?</li>
              <li>CPU কি সত্যিই একসাথে অনেক কাজ করে?</li>
              <li>Variable কম্পিউটারের কোথায় থাকে?</li>
              <li>Cache কেন এত দ্রুত?</li>
              <li>Compiler আসলে কী বানায়?</li>
              <li>Keyboard চাপলে screen-এ অক্ষর আসে কীভাবে?</li>
              <li>Power চলে গেলে RAM কেন সব ভুলে যায়?</li>
            </ul>
            {p('একটা সময় আমি বুঝেছিলাম — আমি আসলে Python, C বা JavaScript শিখছি না। শিখছি abstraction-এর স্তরগুলো।')}
            {p('প্রতিটা নতুন language আমাকে আরও সমৃদ্ধ করছে, কিন্তু একই সঙ্গে মেশিন থেকে আরও দূরে সরিয়ে দিচ্ছে।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 2 }}>
              <li>What is RAM, really?</li>
              <li>Does the CPU truly do many things at once?</li>
              <li>Where does a variable live in the computer?</li>
              <li>Why is cache so fast?</li>
              <li>What does a compiler actually produce?</li>
              <li>How does pressing a key put a letter on screen?</li>
              <li>Why does RAM forget everything when power goes?</li>
            </ul>
            {p("At some point I understood — I wasn't really learning Python, C, or JavaScript. I was learning the layers of abstraction.")}
            {p("Every new language made me richer — and moved me further from the machine. That's when the wish took root: climb down once, and see how the whole machine actually runs.")}
          </div>
        )}
      </Section>

      <Section num="05" bnH2="কীভাবে পড়বেন" enH2="How to read this">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('একটা অনুরোধ।')}
            {p('কোথাও কিছু মুখস্থ করার চেষ্টা করবেন না।')}
            {p('আমি চাই, আপনি প্রতিটা article পড়ে মাথার ভেতরে একটা ছোট animation দেখতে পান।')}
            {p('কোথাও অতিরিক্ত গভীরে যাব না। যেখানে concept-টা অতিরিক্ত academic হয়ে যাচ্ছে বলে মনে হবে — সেখানে থামব, আর ইশারা দিয়ে দেব যে, "বস, এইটুকু জানলেই আপাতত চলবে।"')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>নতুন কোনো technical term দেখলে সেটার ওপর cursor রাখুন (মোবাইলে tap করুন) — যেমন এই <Term id="thread">thread</Term>। একটা ছোট popup সহজ ভাষায় সেটার মানে বুঝিয়ে দেবে।</p>
            {p('কোথাও অতিরিক্ত গভীরে যাব না। তাহলে এবার software-এর সব আরাম-আয়েশ ছেড়ে একেবারে নিচে নেমে যাই।')}
            <p style={{ margin: '0 0 6px', ...bodyStyle }}>Variable না।<br />Object না।<br />Function না।<br />Operating System-ও না।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>শুধু silicon।<br />শুধু তার।<br />শুধু voltage।</p>
            {p('সেখান থেকেই পুরো গল্পটা শুরু করা যাক।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('One request.')}
            {p("Don't try to memorize anything.")}
            {p("What I want is for every article to leave a small animation running in your head.")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>When you meet a new technical term, rest your cursor on it (tap on mobile) — like this <Term id="thread">thread</Term>. A small popup will explain it in plain words.</p>
            {p("And nowhere will I go too deep. Where a concept starts turning academic, I'll stop and signal — \"boss, this much is enough for now.\"")}
            {p("So let's leave all of software's comforts behind and climb all the way down.")}
            <p style={{ margin: '0 0 6px', ...bodyStyle }}>No variables.<br />No objects.<br />No functions.<br />No operating system either.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>Just silicon.<br />Just wire.<br />Just voltage.</p>
            {p("That's where the whole story begins.")}
          </div>
        )}
      </Section>

      <Section num="06" bnH2="একটা সৎ স্বীকারোক্তি" enH2="An honest disclaimer">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এই সিরিজে অনেক কিছু ইচ্ছাকৃতভাবে সহজ করে উপস্থাপন করা হয়েছে।')}
            {p('Computer Architecture, Operating System, Compiler—এর প্রতিটিই এক একটি বিশাল ও স্বাধীন বিষয়। এগুলো নিয়ে বিশ্ববিদ্যালয়ে একাধিক সেমিস্টার ধরে পড়ানো হয়, হাজার পাতার মোটা মোটা বই লেখা হয়, আর প্রতিনিয়ত নতুন গবেষণা চলছে। কয়েকটি আর্টিকেলে সেই পুরো মহাসমুদ্র তুলে আনা সম্ভব নয়, আর সেই চেষ্টাও করা হয়নি।')}
            {p('আমার মূল উদ্দেশ্য হলো—কম্পিউটিংয়ের প্রতিটা স্তরের (Layer) মূল আইডিয়া বা মেকানিক্সটা যেন একজন পাঠক খুব সহজে একটা স্পষ্ট Mental Model হিসেবে দাঁড় করাতে পারেন। আর সেই স্পষ্টতা ও সহজবোধ্যতার খাতিরে অনেক জায়গায় জটিল বিষয়গুলোকে কিছুটা সরলীকরণ করতে হয়েছে। যেখানে মনে হয়েছে অতিরিক্ত জটিলতা মূল গল্প পড়ার অভিজ্ঞতাকে ব্যাহত করবে, সেখানে সূক্ষ্ম অনেক ডিটেইলস এড়িয়ে যাওয়া হয়েছে।')}
            {p('এর মানে এই নয় যে আপনাকে বিভ্রান্ত করার চেষ্টা করা হয়েছে। বিষয়গুলোকে এমনভাবে সাজানো হয়েছে যেন বেসিক ধারণাটা একদম সঠিক থাকে, কিন্তু পড়তে সহজ হয়। তবুও, সরলীকরণ করতে গিয়ে কোথাও কোনো টেকনিক্যাল ভুল থেকে গেলে বা আপনার চোখে পড়লে অবশ্যই জানাবেন—সংশোধন করে নেওয়া হবে।')}
            {p('যদি কোনো নির্দিষ্ট স্তর বা বিষয় আপনার মধ্যে বাড়তি আগ্রহ তৈরি করে, তবে সিরিজের শেষে দারুণ কিছু বই ও রিসোর্সের তালিকা দেওয়া থাকবে—যা আপনাকে এই বিষয়ের গভীরে নিয়ে যেতে সাহায্য করবে।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('A lot in this series is deliberately simplified.')}
            {p('Computer architecture, operating systems, compilers—each is a massive, independent field with multi-semester university courses, thousands of pages of textbooks, and ongoing research. A few articles cannot possibly capture all of that, nor do they try to.')}
            {p('The primary goal here is clarity: to help you build a solid, intuitive mental model of how each layer of computing works. To achieve that clarity, complex technical details have sometimes been abstracted away. Where full precision would have added overwhelming noise, the mechanics were intentionally streamlined to keep the core narrative accessible.')}
            {p("This approach aims to ensure that while the big picture remains accurate and conceptually sound, you aren't bogged down by edge cases or hardware-specific nuances. That said, if you spot an actual error or an oversimplification that crosses into inaccuracy, please let me know—I will happily fix it.")}
            {p("If any section sparks your curiosity, you'll find a curated list of books and resources at the end of the series to help you dive as deep as you'd like.")}
          </div>
        )}
      </Section>

      <RelayNav
        hub={SERIES_HUB_CARD}
        next={{ label: { bn: 'baton প্রথম পর্বে', en: 'baton to the first leg' }, title: bn ? '০১ — Bit-এর ভেতরে কী থাকে?' : "01 — What's inside a bit?", href: '/writing/whats-inside-a-bit', variant: 'next' }}
        bridge={{ bn: 'প্রথম পর্বে আমরা একেবারে voltage স্তর থেকে শুরু করব।', en: 'The first leg starts at the very voltage level.' }}
      />
      <Colophon />
    </article>
  );
}
