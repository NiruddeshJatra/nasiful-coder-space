import type { ReactNode } from 'react';
import { useLang } from '../context/LanguageContext';
import { Section } from '../primitives/Section';
import { Term } from '../primitives/Term';
import { Deeper } from '../primitives/Deeper';
import { Recap } from '../primitives/Recap';
import { RelayNav, SERIES_HUB_CARD } from '../primitives/RelayNav';
import { Colophon } from '../primitives/Colophon';
import { PlaceValueBuilder } from '../widgets/PlaceValueBuilder';
import { UnicodeEncodingDemo } from '../widgets/UnicodeEncodingDemo';
import { PixelColorDemo } from '../widgets/PixelColorDemo';
import { SamplingRateDemo } from '../widgets/SamplingRateDemo';
import { RLECompressionDemo } from '../widgets/RLECompressionDemo';
import { CPUBlindLens } from '../widgets/CPUBlindLens';

export function HowDoesAnythingBecomeBits() {
  const { bn } = useLang();

  const bodyStyle = bn
    ? { fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }
    : { fontFamily: "'Anek Latin',sans-serif" };

  const p = (s: string | ReactNode) => <p style={{ margin: '0 0 16px', ...bodyStyle }}>{s}</p>;
  const pre = (s: string) => (
    <pre style={{ fontFamily: "'Departure Mono',monospace", fontSize: '13.5px', background: 'rgba(255,252,243,0.65)', border: '1px solid #c9bda0', color: '#33301F', padding: '13px 18px', margin: '0 0 20px', overflowX: 'auto' }}>{s}</pre>
  );

  return (
    <article style={{ marginTop: 40, fontSize: '16.5px', lineHeight: 1.9 }}>
      {/* Hook */}
      <div>
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('ধরুন, একটা কাগজে "Hello" লিখে আপনার সামনে ধরলাম। আপনি বুঝবেন এটা পাঁচটা অক্ষর, একটা শব্দ। যদি একটা বিড়ালের ছবি দেখাই, বুঝবেন এটা একটা প্রাণীর ছবি। MP3 চালালে শুনবেন একটা গান।')}
            {p('কিন্তু কম্পিউটার এগুলোর কোনোটাই দেখে না। কম্পিউটারের কাছে "Hello" শব্দটা, বিড়ালের ছবি, আর আপনার প্রিয় গান — সব আসলে একই জিনিস। শুধু ০ আর ১।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><a href="/writing/whats-inside-a-bit" style={{ color: '#00753F' }}>আগের আর্টিকেলে</a> জেনেছি একটা bit physically কেমন করে বেঁচে থাকে — voltage-এর একটা state, flip-flop-এ আটকানো।</p>
            {p('কিন্তু, বাস্তব জগতের একটা অক্ষর, একটা রঙ, একটা সুর — এগুলো memory-তে ঢোকার আগে কীভাবে ০ আর ১-এ রূপ নেয়? সেই translation-এর গল্পটাই আজকের বিষয়।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Suppose I write "Hello" on a piece of paper and hand it to you. You\'ll see five letters, a word. Show you a picture of a cat, you\'ll see an animal. Play an MP3, you\'ll hear a song.')}
            {p("But the computer sees none of that. To it, the word \"Hello\", the cat picture, and your favorite song — they're all the same thing. Just 0s and 1s.")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>In the <a href="/writing/whats-inside-a-bit" style={{ color: '#00753F' }}>last article</a> we saw what a bit physically is — a state of voltage, trapped in a flip-flop.</p>
            {p('Today the question flips. A character in the real world, a color, a sound — how do they become 0s and 1s before landing in memory? That translation is the story for today.')}
          </div>
        )}
      </div>

      <Section num="01" bnH2="প্রথম নিয়ম: সবকিছু আগে সংখ্যা হবে" enH2="First rule: everything becomes a number first">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('একটা কথা মাথায় রাখা দরকার। কম্পিউটারের একটাই কাজ জানা আছে — voltage ধরে রাখা। High বা low। ১ বা ০।')}
            {p('আর voltage-এর combination দিয়ে সে যা প্রকাশ করতে পারে, সেটা শুধুই সংখ্যা। এর বাইরে কিছু না।')}
            {p('এই নিয়ম মেনেই বাকিসব বানানো হয়েছে। যদি text চান — প্রথমে সেই text-কে সংখ্যায় রূপান্তর করতে হবে। যদি ছবি চান — সেটাও প্রথমে সংখ্যায় ভাঙতে হবে। Sound-এর ক্ষেত্রেও একই কথা। তারপর সেই সংখ্যা binary-তে রূপ নেয়, আর সেই binary voltage হিসেবে memory-তে ঢুকে যায়।')}
            {p('তাহলে প্রথম প্রশ্ন — সংখ্যা নিজেই কীভাবে binary হয়?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('One thing to keep in mind. The computer knows one trick — move voltage around. High or low. 1 or 0.')}
            {p('And what voltage combinations can express is only numbers. Nothing else.')}
            {p('Everything else is built on top of this rule. Want text? First convert text into numbers. Want images? First convert those into numbers. Sound? Same story. Then the numbers break into binary, and binary lands in memory as voltage.')}
            {p('So the first question — how do numbers themselves become binary?')}
          </div>
        )}
      </Section>

      <Section num="02" bnH2="সংখ্যা থেকে binary" enH2="From number to binary">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('মানুষ base-10 বা ডেসিমাল সিস্টেম ব্যবহার করে। কেন? সম্ভবত কারণটা সহজ — আমাদের ১০টা আঙুল আছে। ০ থেকে ৯ পর্যন্ত ১০টা digit, আর প্রতিটা column-এর মান ১০-এর power হিসেবে বাড়ে — একক, দশক, শতক, সহস্র।')}
            {p('কম্পিউটারের সুইচ বা transistor বোঝে মাত্র দুইটা state — on বা off। তাই তার জন্য বানানো হয়েছে base-2 বা binary সিস্টেম। এখানে digit শুধু দুইটা (০ আর ১), আর প্রতিটা column-এর মান ২-এর power হিসেবে বাড়ে — ১, ২, ৪, ৮, ১৬, ৩২ — এভাবে।')}
            {p('কেন ঠিক ২-এর power? কারণটা মজার। প্রতিটা নতুন bit আসলে আগের সব bit-এর ক্ষমতাকে দ্বিগুণ করে দেয়। এক bit-এ দুইটা possibility থাকে (০ অথবা ১)। দুই bit যোগ করলে চারটা possibility (০০, ০১, ১০, ১১)। তিন bit-এ আটটা, চার bit-এ ষোলটা। এভাবেই সম্ভাবনার সংখ্যা exponentially বাড়তে থাকে।')}
            {p('তাহলে এই বাইনারি কলামগুলো দিয়ে আমরা সংখ্যা বানাবো কীভাবে? নিয়মটা সহজ: যে যে কলামের মান আপনার যোগ করতে হবে, সেগুলোকে 1 (ON) করে দিন, আর বাকিগুলোকে 0 (OFF)। নিচের যন্ত্রে নিজেই ১৩ বানিয়ে দেখুন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Humans use base-10, or the decimal system. Why? The reason is probably simple — we have 10 fingers. Ten digits (0 through 9), and each column\'s value grows as a power of 10 — ones, tens, hundreds, thousands.')}
            {p("A computer's switches or transistors only understand two states — on or off. So it uses base-2, or binary. Only two digits (0 and 1), and each column's value grows as a power of 2 — 1, 2, 4, 8, 16, 32, and so on.")}
            {p("Why powers of 2 specifically? The reason's fun. Every new bit actually doubles the possibilities. One bit gives you two possible states (0 or 1). Add a second bit and you get four possibilities (00, 01, 10, 11). Three bits give eight. Four give sixteen. The possibilities grow exponentially.")}
            {p('So, how do we actually build numbers using these binary columns? The rule is simple: turn "ON" (1) the columns whose values you need to add up, and leave the rest "OFF" (0). Build 13 yourself on the instrument below:')}
          </div>
        )}
        <PlaceValueBuilder />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>উদাহরণ হিসেবে, ডেসিমাল ১৩ সংখ্যাটার কথা ধরা যাক। আমাদের কলামগুলো হলো ৮, ৪, ২, ১। ১৩ বানাতে আমাদের লাগবে একটা ৮, একটা ৪, এবং একটা ১ (যেহেতু ৮ + ৪ + ১ = ১৩)। ২ আমাদের লাগছে না। তাই বাইনারিতে এর রূপ হবে <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.9em' }}>1101</span>।</p>
            {p('গণিতের ভাষায় হিসাবটা দাঁড়ায় এরকম:')}
            {pre('1101₂ = (1×8) + (1×4) + (0×2) + (1×1) = 13₁₀')}
            {p('পজিটিভ সংখ্যা তো বুঝলাম, কিন্তু কম্পিউটার মাইনাস (−) চিহ্ন মেমোরিতে রাখবে কীভাবে? মেমোরিতে তো প্লাস-মাইনাস বলতে কিছু নেই, আছে শুধু ভোল্টেজ।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>প্রথম দেখায় মনে হতে পারে, আমরা হয়তো বাইনারি সংখ্যার একদম বামের বিটটাকে (Most Significant Bit) সাইন নির্ধারণের জন্য রেখে দিতে পারি — 0 মানে প্লাস, 1 মানে মাইনাস। এই পদ্ধতিকে বলা হয় Sign-Magnitude। কিন্তু এই সরল চিন্তার মধ্যে একটা বড় খুঁত আছে। এভাবে হিসেব করলে কম্পিউটারে +0 এবং −0 নামে দুটি আলাদা বাইনারি রূপ তৈরি হয় (যেমন ৮-বিটে <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>00000000</span> এবং <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>10000000</span>)। গণিতে শূন্যের কোনো সাইন হয় না, আর হার্ডওয়্যার লেভেলে দুটি আলাদা শূন্যের অস্তিত্ব থাকা মানেই যোগ-বিয়োগের লজিক সার্কিট জটিল হয়ে যাওয়া।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>এই সমস্যার সবচেয়ে চমৎকার এবং ইঞ্জিনিয়ারিং-বান্ধব সমাধান হলো <Term id="twoscomp">Two's Complement</Term>।</p>
            {p('এখানে নেগেটিভ সংখ্যা বের করার ট্রিকটা খুব সহজ: প্রথমে সংখ্যাটির পজিটিভ রূপের প্রতিটা বিট উল্টে দিন (0-কে 1 আর 1-কে 0 করুন, যাকে বলে One\'s Complement), তারপর সেই ফলের সাথে জাস্ট 1 যোগ করুন। এই এক নিয়মেই পজিটিভ এবং নেগেটিভ সংখ্যার সাধারণ যোগ-বিয়োগ একই ALU (Arithmetic Logic Unit) সার্কিট দিয়ে বাড়তি কোনো প্লাস-মাইনাস লজিক ছাড়াই পানির মতো নিখুঁতভাবে করা সম্ভব হয়।')}
            {p('সংখ্যা তো হলো। কিন্তু বাস্তব জীবনে আপনি তো শুধু সংখ্যা লেখেন না। যখন চ্যাটবক্সে "Hello" লেখেন, সেই অক্ষরগুলো কীভাবে binary হয়?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>As an example, let's take the decimal number 13. Our columns are 8, 4, 2, and 1. To make 13, we need one 8, one 4, and one 1 (since 8 + 4 + 1 = 13). We don't need the 2. Therefore, its binary representation is <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.9em' }}>1101</span>.</p>
            {p('Mathematically, the calculation looks like this:')}
            {pre('1101₂ = (1×8) + (1×4) + (0×2) + (1×1) = 13₁₀')}
            {p("Positive numbers make sense, but how does a computer actually store a minus (−) sign in memory? Hardware doesn't understand plus or minus; it only understands voltage.")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>At first glance, you might think we can just reserve the leftmost bit (the Most Significant Bit) to represent the sign — 0 for positive, 1 for negative. This approach is called Sign-Magnitude. But there is a glaring flaw with this simple logic. It creates two distinct binary representations for zero: a +0 and a −0 (for example, <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>00000000</span> and <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>10000000</span> in an 8-bit system). In mathematics, zero has no sign, and having two different zeros at the hardware level unnecessarily complicates the logic circuits required for basic arithmetic.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>The most elegant and hardware-friendly solution to this problem is <Term id="twoscomp">Two's Complement</Term>.</p>
            {p("The trick to finding a negative number here is straightforward: first, invert all the bits of its positive counterpart (flip 0 to 1 and 1 to 0, known as One's Complement), and then simply add 1 to the result. By doing this, the computer can handle both addition and subtraction seamlessly using the exact same ALU (Arithmetic Logic Unit) circuitry, without needing any extra hardware logic to process signs.")}
            {p('Fine — numbers are handled. But in real life, you don\'t just write numbers. When you type "Hello" in a chat box, how do those letters become binary?')}
          </div>
        )}
      </Section>

      <Section num="03" bnH2="তথ্য যদি হয় text" enH2="If our piece of information is text">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('Text-কে binary বানানোর ট্রিকটা খুব সহজ — প্রতিটা অক্ষরের জন্য একটা করে নির্দিষ্ট সংখ্যা বরাদ্দ করা।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>Computing-এর একেবারে শুরুর দিকে এই standard-এর নাম ছিল <Term id="ascii">ASCII</Term>। প্রতিটা ইংরেজি অক্ষর, digit, punctuation — সবার জন্য একটা করে ৭-bit code:</p>
            {pre('বড় হাতের  A  →  65  →  01000001\nছোট হাতের  a  →  97  →  01100001')}
            {p('ইংরেজির জন্য ASCII ঠিকঠাকই কাজ করত। কিন্তু সমস্যা শুরু হলো যখন অন্য ভাষা বা emoji-র প্রয়োজন পড়ল। ৭ bit দিয়ে সর্বোচ্চ ১২৮টা character-এর জায়গা হয়। শুধু বাংলা বর্ণমালার সব অক্ষর ধরার মতোই সেখানে জায়গা নেই, পৃথিবীর হাজার হাজার ভাষার কথা তো বাদই দিলাম।')}
            {p('শুরুর দিকে যখন Python বা C দিয়ে database-এ বাংলা input নেওয়া হতো, প্রায়ই screen-এ কিছু অদ্ভুত হিজিবিজি character দেখাত। প্রোগ্রামাররা ভাবতো, আমি লিখলাম বাংলা, screen-এ কেন এই garbage? এগুলো আবার কি?')}
            {p('Computer আসলে বাংলা character-কে ভুল dictionary দিয়ে decode করার চেষ্টা করছিল। ASCII-র dictionary-তে বাংলা নেই। ছিলই না।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>এই সমস্যার সমাধান হলো <Term id="unicode">Unicode</Term> — একটা international standard, যেটা পৃথিবীর প্রতিটা ভাষার প্রতিটা character-এর জন্য একটা করে unique code point নির্ধারণ করে দেয়।</p>
            {p('এখানে একটা সূক্ষ্ম পার্থক্য আছে যেটা বেশিরভাগ মানুষ ধরতে পারে না, কারণ Unicode আর UTF-8 কথাগুলো প্রায়ই interchangeably ব্যবহার হয়। কিন্তু এরা এক জিনিস না।')}
            {p('Unicode বলে দেয় প্রতিটা character-এর পরিচয়পত্র কী হবে। আর সেই পরিচয়পত্রটা memory-তে actual bit হিসেবে কীভাবে লেখা হবে — সেটা বলে UTF-8।')}
            {p('Unicode একটা mapping — পরিচয় বণ্টনের নিয়ম। UTF-8 হলো encoding — সেই পরিচয়কে actual bit-এ রূপান্তরের নিয়ম।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><Term id="utf8">UTF-8</Term> হলো একটা variable-width encoding। ইংরেজি অক্ষরের জন্য এটা ৮ bit (১ byte) ব্যবহার করে — যেটা ASCII-র সাথে পুরোপুরি backward-compatible। বাংলা character-এর জন্য ৩ byte, আর emoji-র মতো জটিল character-এর জন্য ৪ byte পর্যন্ত লাগতে পারে।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>যেহেতু একটা অক্ষরের জন্য তখন একের অধিক byte লাগছে, মেমোরিতে এই byte-গুলো কোন সিরিয়ালে বসবে (<Term id="endian">Endianness</Term>) সেটাও কম্পিউটারকে হিসাব করতে হয়।</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('The trick for turning text into binary is simple — assign every character a specific number.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>The earliest standard for this was <Term id="ascii">ASCII</Term>. Every English letter, digit, punctuation mark — each got a 7-bit code:</p>
            {pre('Capital  A  →  65  →  01000001\nSmall    a  →  97  →  01100001')}
            {p('ASCII worked fine for English. The problem started when other languages or emoji needed to exist. 7 bits gives you at most 128 possible characters. Not even enough for the Bangla alphabet alone, let alone the thousands of languages in the world.')}
            {p("Early on, when I tried taking Bangla input into a database using Python or C, I'd often see weird garbage on the screen. Nothing worked. I typed Bangla; the screen showed nonsense.")}
            {p("Later I understood — the computer was actually trying to decode my Bangla characters using the wrong dictionary. ASCII's dictionary doesn't have Bangla. It never did.")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>The solution is <Term id="unicode">Unicode</Term> — an international standard that assigns a unique code point to every character in every language.</p>
            {p("There's a subtle distinction here that most people miss, because Unicode and UTF-8 are often used interchangeably. But they aren't the same thing.")}
            {p("Unicode says what each character's identity is. How that identity gets written in actual bits in memory — that's UTF-8's job.")}
            {p('Unicode is a mapping — the rule for handing out identities. UTF-8 is an encoding — the rule for turning that identity into actual bits.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><Term id="utf8">UTF-8</Term> is a variable-width encoding. It uses 8 bits (1 byte) for English characters — perfectly ASCII-backward-compatible. A Bangla character takes exactly 3 bytes, while emoji-like complex characters can take up to 4 bytes.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>Because a single character can now span multiple bytes, the hardware also needs to determine the exact byte order (<Term id="endian">Endianness</Term>) in which they are arranged in memory.</p>
          </div>
        )}
        <UnicodeEncodingDemo />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('Text-এর গল্প এতটুকুই। তথ্যের সেই টুকরো যদি একটা অক্ষর হতো, এতক্ষণে সে binary হয়ে memory-তে ঢোকার জন্য প্রস্তুত।')}
            {p('কিন্তু তথ্য যদি ছবির একটা অংশ হয়?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("That's the text story. If our piece of information was a character, it's now binary, ready to land in memory.")}
            {p('But what if it\'s part of an image?')}
          </div>
        )}
      </Section>

      <Section num="04" bnH2="তথ্যের টুকরো যদি হয় image" enH2="If our piece of information is an image">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('যেকোনো digital ছবিকে খুব কাছ থেকে দেখলে দেখা যাবে, এটা আসলে কোটি কোটি ক্ষুদ্রাতিক্ষুদ্র বিন্দুর সমষ্টি। প্রতিটা বিন্দুকে বলে pixel।')}
            {p('Screen-এ রঙ তৈরি করার জন্য ব্যবহার হয় RGB model। প্রতিটা pixel মূলত তিনটা primary color-এর মিশ্রণ — Red, Green, Blue।')}
            {p('প্রতিটা color কতটা উজ্জ্বল হবে, সেটার জন্য ০ থেকে ২৫৫ পর্যন্ত একটা brightness value দেওয়া হয়। ২৫৫ মানে সর্বোচ্চ উজ্জ্বলতা, ০ মানে সম্পূর্ণ off। ২৫৫ পর্যন্ত সংখ্যা store করতে প্রতি color channel-এর জন্য ৮ bit (১ byte) লাগে।')}
            {p('তাহলে একটা pixel-এর রঙ প্রকাশ করতে মোট প্রয়োজন: ৮ + ৮ + ৮ = ২৪ bit। এটাকেই বলে 24-bit color depth। নিচের যন্ত্রে যেকোনো pixel-এ চাপ দিয়ে তার binary রূপ দেখুন:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Zoom in on any digital picture and you'll see it's actually millions of tiny dots. Each dot is called a pixel.")}
            {p('To produce color on a screen, we use the RGB model. Every pixel is a mix of three primary colors — Red, Green, Blue.')}
            {p('Each color has a brightness value from 0 to 255. 255 means full brightness, 0 means completely off. Storing values up to 255 takes 8 bits (1 byte) per color channel.')}
            {p("So one pixel's color takes: 8 + 8 + 8 = 24 bits total. That's what we call 24-bit color depth. Press any pixel on the instrument below to see its binary form:")}
          </div>
        )}
        <PixelColorDemo />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('Computer এই pixel value-গুলোকে row-by-row সাজিয়ে পুরো ছবিটাকে memory-তে একটা bit sequence হিসেবে লিখে রাখে।')}
            {p('এই জায়গায় একটা হিসাব করে দেখা যাক। আপনার screen যদি 1920×1080 resolution-এর হয়, তাহলে এক মুহূর্তে প্রায় ২০ লক্ষ pixel-এর রঙ আলাদাভাবে মনে রাখতে হয়। প্রতিটার জন্য ২৪ bit। মানে শুধু একটা frame render করতেই লাগবে ৬ MB। কিন্তু বাস্তবে একটা ছবি বা ভিডিওর একটা ফ্রেম তো এত জায়গা নেয় না। কিভাবে? সেই গল্প একটু পরে।')}
            {p('Image-এর গল্পও শেষ। কিন্তু কান দিয়ে যা শুনি? বাতাসে ভেসে আসা একটা সুর — সেটা তো কোনো অক্ষর না, কোনো pixel-ও না। সেটাকে কীভাবে bit বানাব?')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('The computer arranges these pixel values row by row and writes the whole image to memory as a sequence of bits.')}
            {p("Here's a number worth thinking about. If your screen runs at 1920×1080, that's about 2 million pixels holding distinct colors at any moment. 24 bits each. Six megabytes just to render one frame. But in reality, an image or a frame of a video doesn't take this much space. How? More on that later.")}
            {p("Image handled. But what about what we hear? A tune floating through air isn't a character, isn't a pixel either. How does that become bits?")}
          </div>
        )}
      </Section>

      <Section num="05" bnH2="তথ্যের টুকরো যদি হয় sound" enH2="If our piece of information is sound">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('শব্দ মূলত একটা continuous pressure wave — বাতাসের একটা কাঁপুনি। Computer continuous কিছু বোঝে না। বোঝে কেবল discrete সংখ্যা।')}
            {p('তাহলে কীভাবে continuous জিনিসকে discrete করা যায়?')}
            {p('একটা analogy দিয়ে ভাবা যাক। ধরুন আপনি একটা দৌড়ের video করছেন। যদি প্রতি এক সেকেন্ডে একটাই ছবি তোলেন, video-টা খুব খাপছাড়া লাগবে — এক মুহূর্তে দৌড়বিদ এক জায়গায়, পরের মুহূর্তে হঠাৎ অনেক দূরে। কিন্তু প্রতি সেকেন্ডে যদি ৬০টা করে ছবি তোলেন, হঠাৎ করে সেটা smooth চলমান video-তে পরিণত হবে।')}
            {p('শব্দের ক্ষেত্রেও ঠিক তাই। পুরো wave-টা ধরে রাখা হয় না। বরং খুব দ্রুত, খুব অনেকগুলো "ছবি" তুলে রাখা হয়। প্রতিটা "ছবি" মানে — ঠিক এই মুহূর্তে wave-টার উচ্চতা (amplitude) কতটুকু।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>এই প্রক্রিয়ার নাম <Term id="sampling">sampling</Term>। নিচের যন্ত্রে rate কমিয়ে-বাড়িয়ে দেখুন wave-টা কতটা বিশ্বস্তভাবে ধরা পড়ে:</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Sound is a continuous pressure wave — the air shaking. Computers understand nothing continuous. They understand discrete numbers.')}
            {p('So how do you turn something continuous into something discrete?')}
            {p("Think about it this way. You're recording a video of someone running. Take one picture per second and the video looks jerky — one moment the runner is here, the next they're way over there. But take 60 pictures per second, and suddenly it turns into a smooth continuous video.")}
            {p("Sound works the same way. The wave itself isn't held onto in full. Instead, snapshots get taken, very fast and very often. Each snapshot means — at this exact moment, what's the wave's height (amplitude)?")}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>The name for this process is <Term id="sampling">sampling</Term>. Sweep the rate up and down below and watch how faithfully the wave gets captured:</p>
          </div>
        )}
        <SamplingRateDemo />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('একটা audio কতটা নিখুঁত হবে, সেটা নির্ভর করে দুটি জিনিসের ওপর:')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Sample Rate:</strong> প্রতি সেকেন্ডে কতবার wave-এর উচ্চতা মাপা হচ্ছে। CD quality audio-র standard হলো 44,100 Hz — মানে প্রতি সেকেন্ডে ৪৪,১০০ বার measurement।</p>
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Audio quality depends on two things:')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Sample Rate:</strong> How many times per second the wave's height is measured. The standard for CD-quality audio is 44,100 Hz — 44,100 measurements per second.</p>
          </div>
        )}
        <Deeper
          bnLabel="আরেকটু গভীরে — কেন 44.1 kHz?"
          enLabel="go deeper — why 44.1 kHz?"
        >
          {bn ? (
            <div lang="bn" style={{ fontFamily: "'Anek Bangla','Anek Latin',sans-serif" }}>
              <p style={{ margin: '0 0 12px' }}>এত বেশি কেন? কারণ মানুষের কান সর্বোচ্চ প্রায় 20 kHz frequency-র শব্দ শুনতে পারে। আর একটা wave-কে ঠিকমতো reconstruct করতে হলে তার double rate-এ sample করতে হয় (এটাকে বলে Nyquist rate)। ২০ × ২ = ৪০ kHz — মানে rate টা অন্তত এর বেশি হতে হবে।</p>
              <p style={{ margin: 0 }}>কিন্তু ঠিক 44,100 কেন, 40,000 বা 45,000 না? এর কারণ Nyquist না, ইতিহাস। শুরুর দিকে digital audio রেকর্ড করা হতো video tape-এ। NTSC আর PAL — দুই টেলিভিশন standard-এর সাথেই মিলে যায় এমন একটা সংখ্যা দরকার ছিল, আর 44,100 ছিল সেই সংখ্যা। আজকের প্রতিটা গান সেই পুরনো video equipment-এর হিসাব বয়ে বেড়াচ্ছে।</p>
            </div>
          ) : (
            <div style={{ fontFamily: "'Anek Latin',sans-serif" }}>
              <p style={{ margin: '0 0 12px' }}>Why so many? Because the human ear can hear up to about 20 kHz, and to reconstruct a wave properly, you need to sample it at double its highest frequency (the Nyquist rate). 20 × 2 = 40 kHz — so the rate just needs to clear that floor.</p>
              <p style={{ margin: 0 }}>But why exactly 44,100, not 40,000 or 45,000? That part isn't Nyquist — it's history. Early digital audio was recorded onto video tape. Engineers needed one number that worked with both television standards, NTSC and PAL, and 44,100 was that number. Every song today still carries the arithmetic of that old video equipment.</p>
            </div>
          )}
        </Deeper>
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Bit Depth:</strong> প্রতিটা measurement store করতে কত bit ব্যবহার হবে? সাধারণত ১৬ বা ২৪ bit। যত বেশি bit, তত বেশি precise — শব্দের সূক্ষ্ম detail তত ভালোভাবে ধরা পড়ে।</p>
            {p('তারমানে, তথ্যের টুকরো এখন আর অক্ষর, pixel বা sound না। সব রূপে সে এখন সংখ্যা। আর সংখ্যা মানেই bit। একটা বিশাল রহস্য উন্মোচিত হলো।')}
            {p('কিন্তু এখানে একটা সমস্যা আছে।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Bit Depth:</strong> How many bits are used to store each measurement — usually 16 or 24. More bits, more precision — subtle details of the sound get captured more faithfully.</p>
            {p("Our piece of information is no longer a character, a pixel, or a sound. In every form, it's now a number. And a number is bits. We have unveiled a large mystery.")}
            {p("But there's a problem.")}
          </div>
        )}
      </Section>

      <Section num="06" bnH2="সমস্যা — সব কিছুই বিশাল" enH2="The problem — everything is huge">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('যদি text, image, sound-এর প্রতিটা কণা এভাবে memory-তে লিখে রাখা হয়, তাহলে file size হবে ভয়াবহ:')}
            {pre('3-minute গান      →  ~30 MB   (raw)\nHD ছবি            →  ~6-10 MB (raw)\n1-hour 4K video   →  ~100+ GB (raw)')}
            {p('এত বড় file-এর ভার internet সহ্য করতে পারবে না। Instagram-এ ছবি upload করতে ঘণ্টা লেগে যাবে। YouTube video load-ই হবে না।')}
            {p('সমাধান হলো compression। ছোট করে ফেলা।')}
            {p('আর এই magic-টা আসলে দুই ধরনের।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('If we stored text, image, and sound faithfully in memory, file sizes would be terrifying:')}
            {pre('3-minute song     →  ~30 MB   (raw)\nHD image          →  ~6-10 MB (raw)\n1-hour 4K video   →  ~100+ GB (raw)')}
            {p("The internet couldn't carry this weight. Instagram uploads would take hours. YouTube videos wouldn't load.")}
            {p('The solution is compression. Make it small.')}
            {p('And the magic comes in two flavors.')}
          </div>
        )}
      </Section>

      <Section num="07" bnH2="Compression: চতুরভাবে ছোট করা" enH2="Compression: clever shrinking">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><Term id="lossless">lossless compression</Term> হচ্ছে সেই ধরনের compression যেখানে কিছুই হারায় না। File compress করলাম, পরে decompress করলাম — original ফিরে পেলাম, একটাও bit বদলালো না।</p>
            {p('এটা কীভাবে সম্ভব? আসল ট্রিকটা হলো — data-র মধ্যে থাকা repetition বা pattern খুঁজে বের করা।')}
            {p('একটা সহজ example। কেউ যদি জিজ্ঞেস করে, নিচের জিনিসটা লেখার সহজ উপায় কী?')}
            {pre('AAAAAAAAAAAAAAAAAA')}
            {p('আপনি হয়তো বলবেন — "18 × A"।')}
            {p('দুটোই একই কথা প্রকাশ করে, কিন্তু দ্বিতীয়টা অনেক ছোট। এটাই Run-Length Encoding (RLE)-এর মূল আইডিয়া। পর পর একই জিনিস থাকলে সেটা বারবার না লিখে জাস্ট "কতবার" আর "কী" লিখে দেওয়া। যদি কোনো ছবিতে পর পর ৫০টা সাদা pixel থাকে, RLE লিখবে 50 × White — ৫০টা আলাদা pixel value store করার বদলে একটা জোড়া।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><Term id="lossless">Lossless compression</Term> is the kind that loses nothing. Compress a file, decompress it later, you get the exact original back — not a single bit changed.</p>
            {p('How is that possible? The real trick is finding repetition or patterns in the data.')}
            {p('Quick example. If someone asked you the simplest way to write this:')}
            {pre('AAAAAAAAAAAAAAAAAA')}
            {p('You\'d probably say — "18 × A."')}
            {p('Both express the same thing, but the second is much smaller. That\'s the core idea of Run-Length Encoding (RLE). If the same thing repeats, don\'t write it out; just write "how many" and "what." A picture with 50 white pixels in a row? RLE writes 50 × White instead of storing 50 separate pixel values.')}
          </div>
        )}
        <RLECompressionDemo />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('আরেকটা technique হলো Huffman coding। এটার idea-টা দারুণ। ধরুন আপনি আর আপনার বন্ধু প্রতিদিন 100 বার একটা phrase লেখেন — "ঠিক আছে"। এতবার লিখতে গিয়ে অনেক সময় খরচ হয়। যদি দুজন মিলে আগে থেকে ঠিক করে রাখেন, একটা ⭐ চিহ্ন মানে হবে "ঠিক আছে" — তাহলে একই তথ্য অনেক কম জায়গায় প্রকাশ করা যাবে।')}
            {p('Huffman-এর মূল আইডিয়া ঠিক এমনই। File-এ সবচেয়ে বেশিবার আসা data-কে সবচেয়ে ছোট code দাও। কম আসা data-কে বড় code। মোট size তখন দ্রুত কমে যায়।')}
            {p('Huffman algorithm-এর গভীরে গেলে tree structure, priority queue — অনেক জিনিস আসবে। কিন্তু এখনের জন্য এই basic intuition-টাই যথেষ্ট।')}
            {p('Developer হিসেবে যখন browser-এ HTML, CSS, JS পাঠান, সেখানে lossless compression (Gzip বা Brotli) mandatory। কারণ ওখানে একটা semicolon হারিয়ে গেলেই code ভেঙে পড়বে। Lossless-এ কিছুই হারায় না, তাই এটা নিরাপদ।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><Term id="lossy">lossy compression</Term> অন্য জিনিস। এখানে ইচ্ছাকৃতভাবে কিছু data চিরতরে মুছে ফেলা হয় — কিন্তু এমনভাবে, যাতে মানুষের চোখ বা কান পার্থক্য ধরতে না পারে।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Sound-এ:</strong> MP3 format মানুষের শোনার সীমাবদ্ধতা কাজে লাগায়। যে frequency-গুলো মানুষ শুনতেই পায় না, সেগুলো বাদ দিয়ে দেওয়া হয়। একই মুহূর্তে যদি একটা জোরালো শব্দ চলে, তার পাশে একটা হালকা শব্দ থাকলে — মানুষের কান হালকা শব্দটা ধরতে পারে না, তাই সেটাও বাদ।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Image-এ:</strong> JPEG format মানুষের চোখের বৈশিষ্ট্যকে কাজে লাগায়। আমাদের চোখ রঙের চেয়ে আলোর তারতম্য বেশি ভালোভাবে ধরে। তাই ছবির রঙের তথ্য একটু কমিয়ে দিলে চোখ ধরতে পারে না, কিন্তু file অনেক ছোট হয়ে যায়।</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Video-তে:</strong> এক frame থেকে পরের frame-এ যে অংশগুলো পরিবর্তন হচ্ছে না (যেমন background), সেগুলো নতুন করে store না করে আগের frame থেকে reference নেওয়া হয়। একটা এক-ঘণ্টার video-তে বেশিরভাগ frame-ই আসলে আগের frame-এর সামান্য variation। H.264, H.265, AV1 — এই সব encoding format এই আইডিয়াটাকেই কাজে লাগায়।</p>
            {p('সহজ rule of thumb — media (image, audio, video)-এর জন্য lossy compression যথেষ্ট। কিন্তু code, text, database backup-এর জন্য lossless ছাড়া উপায় নেই।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Another technique — Huffman coding. The idea is elegant. Suppose you and your friend text a phrase 100 times a day — "yeah, okay." Typing it that many times wastes a lot of effort. If the two of you agree in advance that one ⭐ means "yeah, okay" — you can express the same information in a lot less space.')}
            {p("Huffman's core idea is exactly that. Look at the file. Give the most frequently occurring data the shortest code. Give rare data longer codes. Total size shrinks fast.")}
            {p('The full Huffman algorithm gets into trees and priority queues — but for today\'s story, this basic intuition is enough.')}
            {p('As a developer, when you send HTML, CSS, or JS to a browser, lossless compression (Gzip or Brotli) is mandatory. Lose a single semicolon and the code breaks. Lossless loses nothing, so it\'s safe.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><Term id="lossy">Lossy compression</Term> is a different beast. Here we deliberately throw away some data — but in ways that human eyes and ears can't catch.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Sound:</strong> MP3 exploits the limits of hearing. Frequencies humans can't hear anyway? Gone. If a quiet sound plays at the same time as a loud one, the ear can't catch the quiet part — so it goes too.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Image:</strong> JPEG uses the eye's characteristics. Our eyes catch brightness differences better than color differences. So JPEG reduces color detail a bit, and the eye doesn't notice, but files get dramatically smaller.</p>
            <p style={{ margin: '0 0 16px', ...bodyStyle }}><strong>Video:</strong> Most background pixels don't change from one frame to the next. Instead of re-storing them, encoders reference the previous frame. An hour-long video is mostly small variations on the previous frame. H.264, H.265, AV1 — all these encoders exploit this idea.</p>
            {p('Simple rule of thumb — media (image, audio, video) → lossy is fine. Code, text, databases → lossless is mandatory.')}
          </div>
        )}
      </Section>

      <Section num="08" bnH2="CPU কিন্তু কিছুই বোঝে না" enH2="The CPU understands none of this">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এই জায়গায় একটা weird ব্যাপার আছে।')}
            {p('তথ্যের সেই টুকরোটা যখন memory-তে voltage হিসেবে বসে আছে, CPU-র কাছে সেটা কী? একটা অক্ষর? একটা pixel? একটা sound sample?')}
            {p('আসলে কিছুই না।')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>CPU-র কাছে <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>01000001</span> মানে কেবল আটটা voltage-এর একটা pattern। এটা "A" না। এটা "65" সংখ্যাও না। এটা কোনো "লাল shade"-ও না। এটা শুধু voltage।</p>
            {p('CPU কখনো ভাবে না — "আরে! এটা তো একটা বিড়ালের ছবি!" কিংবা "এটা তো বাংলা language!"')}
            {p('সে শুধু instruction follow করে যায়। ঠিকঠাক voltage সরায়।')}
            {p('তাহলে অর্থটা তৈরি হয় কোথায়? সফটওয়্যারে। যে application এই bit sequence খুলছে, সে-ই ঠিক করে দেয় এটা কী রূপে দেখানো হবে:')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Here's the weird part.")}
            {p('When our piece of information sits in memory as voltage, what is it to the CPU? A character? A pixel? A sound sample?')}
            {p('Actually — nothing.')}
            <p style={{ margin: '0 0 16px', ...bodyStyle }}>To the CPU, <span style={{ fontFamily: "'Departure Mono',monospace", fontSize: '0.85em' }}>01000001</span> is just eight voltage patterns. Not "A". Not the number "65". Not "a shade of red". Just voltage.</p>
            {p('The CPU never thinks — "oh look, it\'s a cat picture!" or "oh, that\'s Bangla!"')}
            {p('It just follows instructions. Moves voltage properly.')}
            {p('So where does meaning come from? Software. Whatever application is reading these bits decides how they get shown:')}
          </div>
        )}
        <CPUBlindLens />
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('Same bit, ভিন্ন meaning। Software gives meaning। CPU is blind।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p('Same bits, different meanings. Software gives meaning. The CPU is blind.')}
          </div>
        )}
      </Section>

      <Section num="09" bnH2="পুরো গল্পটা একবার" enH2="The whole story at once">
        {bn ? (
          <div lang="bn" style={bodyStyle}>
            {p('এবার সেই তথ্যের টুকরোর পুরো যাত্রা একবার চোখের সামনে চালিয়ে দেখা যাক।')}
            {p('আপনি লিখলেন:')}
            {pre('const message = "Hello";')}
            <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9 }}>
              <li>প্রথমে প্রতিটা অক্ষর একটা করে Unicode code point পেল</li>
              <li>UTF-8 সেই code point-গুলোকে bit-এ রূপান্তর করে দিল</li>
              <li>যদি network-এ পাঠানো হয়, Gzip এসে সেই bit-গুলোকে আরও ছোট করে দিল</li>
              <li>Memory controller সেই bit-গুলোকে RAM-এর flip-flop-এ voltage হিসেবে বসিয়ে দিল</li>
              <li>পরে CPU যখন এই ডেটা পড়তে চাইল, সেই voltage read করে ফেরত আনল</li>
              <li>আপনার JavaScript engine সেই bit-গুলোকে interpret করে আবার সেই আগের "Hello" শব্দটাই ফিরিয়ে দিল</li>
            </ul>
            {p('পুরো process-এ same information বার বার রূপ বদলেছে। বাতাসের কম্পন থেকে সংখ্যা। সংখ্যা থেকে bit। বিট থেকে voltage। আবার voltage থেকে সংখ্যা, সংখ্যা থেকে অক্ষর।')}
            {p('Meaning একই থেকেছে। শুধু রূপ পাল্টেছে।')}
            {p('সমস্ত computing-এর গল্পটা মূলত এটাই — একই তথ্যের একের পর এক translation, কিন্তু meaning একই থাকা।')}
          </div>
        ) : (
          <div style={bodyStyle}>
            {p("Let's play back the journey of our piece of information from start to finish.")}
            {p('You wrote:')}
            {pre('const message = "Hello";')}
            <ul style={{ margin: '0 0 16px', paddingLeft: 22, lineHeight: 1.9 }}>
              <li>First each character got a Unicode code point</li>
              <li>UTF-8 turned those code points into bits</li>
              <li>If it was sent over the network, Gzip came in and shrunk the bits further</li>
              <li>The memory controller pushed those bits into RAM's flip-flops as voltage</li>
              <li>Later, when the CPU wanted to read this data, it read the voltage back</li>
              <li>Your JavaScript engine interpreted those bits and gave you back the original "Hello"</li>
            </ul>
            {p('Through the whole process, the same information kept changing form. Air vibrations to numbers. Numbers to bits. Bits to voltage. Voltage back to numbers, numbers back to characters.')}
            {p('Meaning stayed the same. Only the form changed.')}
            {p('The whole story of computing is basically this — the same information being translated, over and over, without losing what it means.')}
          </div>
        )}
        <Recap>
          {bn ? (
            <>
              <li>কম্পিউটার কোনো ছবি "দেখে" না, কোনো গান "শোনে" না — সব তথ্যই শেষ পর্যন্ত bit-এর একটা sequence।</li>
              <li>বাস্তব জগতকে digital করার আলাদা আলাদা dictionary আছে — text-এর জন্য Unicode + UTF-8, image-এর জন্য RGB pixel grid, sound-এর জন্য sampling।</li>
              <li>Compression দুই ধরনের — lossless (কিছুই হারায় না, code/text-এর জন্য mandatory) আর lossy (মানুষের ইন্দ্রিয়ের সীমাবদ্ধতা কাজে লাগায়, media-র জন্য standard)।</li>
              <li>Meaning-টা software-এ, bit-এ না — একই bit sequence context ভেদে অক্ষর, সংখ্যা বা pixel হতে পারে।</li>
            </>
          ) : (
            <>
              <li>The computer doesn't "see" any image or "hear" any song — every piece of information ends up as a sequence of bits.</li>
              <li>Each type of real-world thing has its own digitization dictionary — Unicode + UTF-8 for text, RGB pixel grids for images, sampling for sound.</li>
              <li>Compression comes in two flavors — lossless (loses nothing, mandatory for code and text) and lossy (exploits the limits of human perception, standard for media).</li>
              <li>Meaning lives in software, not in the bits — the same bit sequence is a character, a number, or a pixel depending on the context that reads it.</li>
            </>
          )}
        </Recap>
      </Section>

      <RelayNav
        hub={SERIES_HUB_CARD}
        next={{ label: { bn: 'baton পরের পর্বে', en: 'baton to the next leg' }, title: bn ? '০৩ — CPU-র blueprint' : "03 — The CPU's blueprint", href: '/writing/cpu-blueprint', variant: 'next' }}
        bridge={{ bn: 'তথ্যের সেই টুকরোটা এখন memory-তে voltage হিসেবে সুন্দর বসে আছে। কিন্তু সে নিজে থেকে কিছুই করতে পারে না। কেউ একজনকে এসে তাকে ব্যবহার করতে হবে — যোগ করতে হবে, সরাতে হবে, তুলনা করতে হবে। কে সেই কেউ? পরের আর্টিকেলে সেই হিসাবের যন্ত্রপাতির ভেতর একবার ঢুকে দেখা যাবে।', en: "Our piece of information sits comfortably in memory as voltage. But it can't do anything on its own. Someone has to come and use it — add it, move it, compare it. Who's that someone? Next article, we step inside the machinery that does the arithmetic." }}
      />
      <Colophon />
    </article>
  );
}
