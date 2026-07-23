# CPU-র blueprint

## একটা processor-এর ভেতরে আসলে কী কী থাকে?

ধরা যাক, `২` এবং `৩` সংখ্যা দুটি এখন RAM-এর কোথাও voltage হিসেবে চুপচাপ বসে আছে। জমা হয়ে আছে। তারা নিজে থেকে কিছুই করতে পারে না। কিন্তু আপনি যখন কোডে লিখলেন:

```python
result = 2 + 3
```

ঠিক কয়েক ন্যানোসেকেন্ডের মধ্যে মেমরিতে `৫` তৈরি হয়ে গেল।

প্রশ্ন হলো, সিলিকনের একটা জড় টুকরো কীভাবে হিসাব করল যে ২ আর ৩ যোগ করলে ৫ হয়? তার তো কোনো মানুষের মতো বুদ্ধি নেই। এই আর্টিকেলে আমরা এই দুটি সংখ্যার ট্র্যাক ফলো করে সরাসরি সিপিইউ-এর হার্ডওয়্যার লেভেলে ঢুকে যাবো। দেখবো কোনো অপারেটিং সিস্টেম বা সফটওয়্যারের সাহায্য ছাড়াই, শুধু পিওর ইলেকট্রনিক্স দিয়ে কীভাবে একটি হিসাব সম্পন্ন হয়।

আমরা মূলত প্রসেসরের ৪টি মূল ইন্টারনাল কম্পোনেন্টের ওপর ফোকাস করবো:

- **ALU (Arithmetic Logic Unit):** যেখানে মূল গাণিতিক হিসাবগুলো হয়।
- **Register:** সিপিইউ-এর ভেতরের অতি দ্রুতগতির লোকাল মেমরি।
- **Data Bus:** কম্পোনেন্টগুলোর মধ্যে ডেটা আদান-প্রদানের হাইওয়ে।
- **Clock:** পুরো প্রসেসরের টাইমিং ও গতি সমন্বয় করার ইঞ্জিন।

> **একটি জরুরি পার্থক্য:** অনেকেই CPU এবং ALU-কে একই জিনিস মনে করে গুলিয়ে ফেলেন। আসলে ALU হলো CPU-র ভেতরের একটি নির্দিষ্ট ডিপার্টমেন্ট মাত্র। একটি বাড়ির রান্নাঘর যেমন পুরো বাড়িটার প্রতিনিধি নয়, কিন্তু রান্নার কাজটা সেখানেই হয়—ঠিক তেমনি ALU পুরো প্রসেসর নয়, কিন্তু গাণিতিক ও যৌক্তিক হিসাবের মূল দায়িত্বটা তারই।
> 

---

// ALU: logic gate থেকে গণিত

CPU-র ভেতরে যেখানে গণিতের হিসাব হয়, সেটাই **ALU** — Arithmetic Logic Unit। যোগ, বিয়োগ, তুলনা এবং বিটওয়াইজ লজিক অপারেশন (যেমন AND, OR, XOR)—সবকিছুই এখানে ঘটে।

কিন্তু ALU-র ভেতরে কোনো রহস্যময় বুদ্ধিমত্তা নেই। এটা তৈরি হয়েছে আগের আর্টিকেলে দেখা সেই logic gate-গুলো নিখুঁত বিন্যাসে জোড়া লাগিয়ে। কীভাবে দুইটা ১-bit binary সংখ্যা (ধরুন A আর B) যোগ করার সার্কিট বানানো যায়, সেটা একটু দেখা যাক।

Binary যোগের নিয়মগুলো সরল:

- 0 + 0 = 00
- 0 + 1 = 01
- 1 + 0 = 01
- 1 + 1 = 10 (ডেসিমাল ২)

খেয়াল করুন:

- **ডানপাশের bit (Sum)** কেবল তখনই ১ হয় যখন A অথবা B-এর যেকোনো একটার মান ১, কিন্তু দুইটাই ১ হলে ০। ঠিক একটা **XOR gate** এর মতো আচরণ।
- **বাঁপাশের bit (Carry)** কেবল তখনই ১ হয় যখন A এবং B — দুইটাই ১। এটা ঠিক **AND gate** এর মতো।

XOR আর AND gate পাশাপাশি জোড়া দিলে তৈরি হয় একটা **Half Adder।**

কিন্তু এখানে একটা সমস্যা আছে।

Half Adder শুধু দুটি একক bit যোগ করতে পারে। মানুষ যেমন হাতে একটা "carry" মনে রাখে বড় সংখ্যা যোগ করার সময়, Half Adder সেটা পারে না। তাহলে এটি 1111 + 0001 যোগ করবে কীভাবে?

এই সমস্যার সমাধান হলো **Full Adder**। একই কাঠামোর সাথে "Carry In" নামে একটা অতিরিক্ত input যোগ করা হয়, যাতে আগের bit-এর carry পরের bit-এ এসে ঢুকতে পারে।

এখন প্রসেসরে ৬৪-bit-এর দুইটা সংখ্যা যোগ করতে চাইলে কী করতে হবে?

সহজ বুদ্ধি হলো—এমন ৬৪টি Full Adder একের পর এক সিরিজে জোড়া দেওয়া। একটা ট্রেনের কথা কল্পনা করুন। প্রতিটা বগি একটা Full Adder। প্রথম বগি carry পাঠায় দ্বিতীয় বগিতে। দ্বিতীয়টা তৃতীয়তে। এভাবে ৬৪ নম্বর বগি পর্যন্ত সেই ছোট্ট carry signal দৌড়াতে থাকে। এই নকশাকে বলা হয় **Ripple Carry Adder**।

[FIGURE 1: A schematic diagram of a Half Adder circuit. Show input wires A and B branching. One branch goes into an XOR gate, producing the "Sum" output. The other branch goes into an AND gate, producing the "Carry" output. Add standard engineering logic symbols for XOR and AND gates. Caption: "Half Adder: logic gate দিয়ে binary যোগের প্রথম ধাপ। Another diagram or animation type widget together here for full adder — how half adder can be used to make full adder and how full adder can add two bits along with previous carry. Then, another diagram/widget for full adder to ripple carry adder. One widget to show connection among these three. As clear to understand as possible, interactive if needed"]

**ডিসক্লেইমার:** থিওরি শেখানোর জন্য এই ট্রেনের অ্যানালজিটি চমৎকার হলেও, আধুনিক সুপার-ফাস্ট প্রসেসরে এই পদ্ধতি ব্যবহার করা হয় না। কারণ ৬৪টি বগি পার হতে হতে সিগন্যালে যে সামান্যতম সময়ের বিলম্ব (Propagation Delay) ঘটে, তা ৩-৫ গিগাহার্টজ ক্লক স্পিডের কম্পিউটারের জন্য বড্ড ধীরগতির। তাই আধুনিক প্রসেসরে **Carry-Lookahead Adder** বা **Prefix Adder** নামের জটিল সার্কিট ব্যবহার করা হয়, যা একটি বিশেষ গাণিতিক ট্রিক খাটিয়ে ৬৪টি বিটের ক্যারেড মান আলাদা আলাদা বগিতে সিরিয়ালি না পাঠিয়ে একসাথেই (Parallelly) হিসাব করে ফেলে।

যোগফল তো তৈরি হলো। কিন্তু এই যোগফলটা রাখা হবে কোথায়? CPU কি সরাসরি RAM-এ পাঠিয়ে দেবে? না, RAM প্রসেসরের কেন্দ্র থেকে অনেক দূরে অবস্থিত। প্রসেসরের একদম নিজের কাছেই অত্যন্ত দ্রুতগতির কিছু মেমরি সেল থাকা দরকার — যেখানে হিসাবের ইনপুট, অন্তর্বর্তীকালীন মান এবং আউটপুট সাময়িকভাবে জমা থাকতে পারে। এই সেলগুলোই হলো **Register**।

---

// Register: CPU-র নিজের ডেস্ক

CPU যখন হিসাব করে, তখন সে একটা কাজ শেষ করে পরেরটার জন্য অপেক্ষা করে। RAM থেকে বারবার ডেটা আনা-নেওয়া করা বেশ ঝামেলার কাজ, কারণ র‍্যাম সিপিইউ-এর থেকে বেশ দূরে এবং ধীরগতির। তাই CPU-র ঠিক ভেতরেই ডেটা ধরে রাখার জন্য একদল অত্যন্ত দ্রুত memory cell থাকে — এদের বলে register।

একটি রেজিস্টার আসলে কী? আগের আর্টিকেলে দেখা সেই **Flip-flop**-এর কথা মনে আছে? একটি রেজিস্টার হলো কতগুলো ফ্লিপ-ফ্লপকে পাশাপাশি লাইনে দাঁড় করিয়ে রাখা—যেন এক সারি বসার সিট। একটি ৬৪-বিট রেজিস্টার মানে হলো পাশাপাশি ৬৪টি ফ্লিপ-ফ্লপ, যার প্রতিটা একেকটি ১ বিট (০ বা ১) ধরে রাখে।

বিশ্ববিদ্যালয়ে মাইক্রোপ্রসেসরের কোর্সে অনেক সময় AX, BX বা PC-এর মতো কঠিন সব নাম শুনে রেজিস্টারকে কোনো রহস্যময় যন্ত্র মনে হয়। কিন্তু আসল সত্য হলো, রেজিস্টার কোনো জাদুর বাক্স নয়। এটা শুধু সিপিইউ-এর নিজের খাতা—যেখানে সে এই মুহূর্তে যে ডেটা নিয়ে কাজ করছে, তা লিখে রাখে।

সিপিইউ-এর কাছে এখন হিসাবের জন্য ALU আছে, আর ডেটা রাখার জন্য রেজিস্টারও আছে। কিন্তু এই ডেটা এক জায়গা থেকে আরেক জায়গায় যাবে কীভাবে?

CPU-র কাছে এখন হিসাবের জন্য ALU আছে, ডেটা রাখার জন্য register-ও আছে। কিন্তু ডেটা এক জায়গা থেকে আরেক জায়গায় যাবে কীভাবে?

---

// Data bus, decoder, multiplexer: তথ্যের হাইওয়ে

*ব্যাখ্যা সহজ রাখার জন্য এখানে তিনটা কাল্পনিক register-এর নাম ধরা যাক — Register A, Register B, আর Register C। বাস্তব প্রসেসরে এদের নাম অন্যরকম হয়, কিন্তু কাজের ধরন একই।*

CPU-র ভেতরের এই component-গুলোর মধ্যে ডেটা আদান-প্রদান করার জন্য একগুচ্ছ তামার তৈরি সংযোগ লাইন থাকে, যেগুলোকে একসাথে বলে data bus। সহজভাবে ভাবলে, এটা CPU-র ভেতরের ডেটা চলাচলের হাইওয়ে। একটা 64-bit CPU-তে data bus-এর width সাধারণত ৬৪ — মানে একই সময়ে ৬৪টা bit parallel-এ যাতায়াত করতে পারে।

কিন্তু হাইওয়েতে যদি ট্রাফিক কন্ট্রোল না থাকে, তবে কি বিশৃঙ্খলা হবে না? ধরুন CPU-র কাছে ৫টা register আছে, কিন্তু এই মুহূর্তে ALU-তে শুধু Register A আর Register B-র ডেটা পাঠানো দরকার। বাকি ৩টা register-এর ডেটা যেন ভুলবশত ALU-তে গিয়ে ঢুকে না পড়ে — সেটা নিয়ন্ত্রণ করার জন্য দুইটা বিশেষ সার্কিট ব্যবহার করা হয়।

**Multiplexer (Mux) — এটি হলো একটা ট্রাফিক সিগন্যাল বা সুইচ।** এটি এমন একটা logic circuit যা একাধিক input line-এর মধ্যে যেকোনো একটাকে select করে সেটার ডেটা output-এ পাঠায়। অর্থাৎ, মাল্টিপ্লেক্সার ঠিক করে দেয়—এই মুহূর্তে কোন রেজিস্টার থেকে ডেটা হাইওয়েতে উঠবে। একটা railway station-এর কথা ভাবুন। অনেকগুলো প্ল্যাটফর্মে ট্রেন দাঁড়িয়ে আছে। সিগন্যাল ছাড়া কি সবগুলো ট্রেন একসাথে ছেড়ে দিতে পারবে? MUX হলো সেই সিগন্যাল, যা বলে দেয়—এই মুহূর্তে শুধু Register A-এর ট্রেনটিই চলবে।

**Decoder — এটি হলো বিল্ডিংয়ের সিকিউরিটি গার্ডের মতো।** এটা একটা binary address input হিসেবে নেয় এবং তা দেখে ঠিক করে কোন দরজাটি খুলতে হবে। হিসাব শেষে ফলাফলটি যেন ভুল কোনো রেজিস্টারে না গিয়ে কেবল **Register C**-তেই জমা হয়, তা এই ডিকোডার নিশ্চিত করে। সে শুধু নির্দিষ্ট রেজিস্টারটির জন্য "দরজা" খুলে দেয়, বাকিগুলো বন্ধ থাকে।

[FIGURE/Widget 2: A block diagram of the CPU internal architecture. Show Register A and Register B connected via a Multiplexer to the inputs of the ALU. The output of the ALU connects back to Register C via the Data Bus. Show a Decoder activating the select lines. All components share a common clock line (dashed line). Caption: "CPU-র ভেতরের ডেটা ফ্লো: register, multiplexer, ALU-র সংযোগ।"]

Decoder আর multiplexer মিলে CPU ঠিক করে দেয় — এই মুহূর্তে কোন register থেকে ডেটা read হবে, আর ALU-র হিসাব শেষে ফলাফল কোন register-এ গিয়ে জমা হবে।

কিন্তু এই পুরো সার্কিটে কখন কোন ডেটা কোথায় যাবে, কখন ALU যোগ করবে, কখন register save করবে — সবার timing এক সুতোয় গাঁথবে কে?

---

// Clock: CPU-র হার্টবিট

CPU-র ভেতরে ডেটা চলাচলকে synchronize করার জন্য একটা oscillator থাকে, যা নির্দিষ্ট তালের ওপর ভিত্তি করে ইলেকট্রিক্যাল পালস পাঠায়। এটাই clock। CPU-র সব component এই pulse-এর সাথে তাল মিলিয়ে কাজ করে, যা পুরো system-এর synchronization নিশ্চিত করে।

Clock-এর speed মাপা হয় GHz (gigahertz) এককে। আপনার প্রসেসরের স্পিড যদি ৩.০ GHz হয়, তার মানে ক্লক প্রতি সেকেন্ডে ৩০০ কোটি বার টিক বা পালস দিচ্ছে।

একটা অর্কেস্ট্রার কথা ভাবুন। যদি প্রতিটা মিউজিশিয়ান নিজের ইচ্ছামতো বাজানো শুরু করে, তবে সেটা মিউজিক হবে না, বিশৃঙ্খলা হবে। কিন্তু কন্ডাক্টর যখন হাত নাড়েন, সবাই একই মুহূর্তে বাজানো শুরু করে। Clock হলো সেই কন্ডাক্টর। প্রতিটি টিকের সাথে সাথে সিপিইউ-এর ফ্লিপ-ফ্লপগুলো নতুন ভ্যালু সেভ করে, আর ডেটা পরের ধাপে এগিয়ে যায়। Clock না থাকলে ডেটা এক সার্কিট থেকে আরেক সার্কিটে সময়ের আগেই চলে যেত, আর পুরো সিস্টেমের হিসাব জগাখিচুড়ি হয়ে যেত।

*তাহলে clock speed যত বাড়াই, কম্পিউটার তত super-fast হয়ে যাবে? না, তেমনটা না। খুব বেশি speed দিলে transistor-গুলো অতিরিক্ত তাপ তৈরি করে, power খরচ বেড়ে যায়, আর শেষে circuit স্থিতিশীলভাবে কাজ করতে পারে না। আপাতত এটুকু জানলেই চলবে — clock হলো CPU-র সেই কন্ডাক্টর, যার তালে তালে পুরো chip-এর কোটি কোটি transistor একসাথে march করে।*

---

// ২ + ৩ = ৫: প্রসেসরের ভেতরের সেই কয়েক ন্যানোসেকেন্ড

এবার আমাদের জানা কম্পোনেন্টগুলো দিয়ে `result = 2 + 3` হিসাবের পুরো যাত্রা একবার দেখে নেওয়া যাক:

১. Register State**:** ২ এবং ৩ আগে থেকেই Register A আর Register B-তে ভোল্টেজ হিসেবে বসে আছে।

২. Clock Pulse **১:** ক্লক টিক দিল। সঙ্গে সঙ্গে Multiplexer বলে উঠল — "Register A আর B, তোমরা এবার ALU-তে যাও।" ডেটা বাসের মধ্য দিয়ে ২ আর ৩ ছুটে গেল ALU-র ইনপুটে।

৩. **ALU-র কারসাজি:** ALU-র ভেতর লজিক গেট আর অ্যাডারগুলো মুহূর্তের মধ্যে ২ আর ৩-কে যোগ করে ৫ (0101) তৈরি করে ফেলল।

৪. Clock Pulse **২:** ক্লক আবার টিক দিল। এইবার Decoder Register C-এর দরজা খুলে দিল। ALU থেকে আসা ৫ ভোল্টেজ হিসেবে Register C-র ফ্লিপ-ফ্লপে গিয়ে স্থায়ীভাবে বসে পড়ল।

কয়েক ন্যানোসেকেন্ডের পুরো গল্প শেষ। কোনো ম্যাজিক নেই—শুধু voltage-এর pattern, logic gate-এর arrangement, আর clock-এর tick।

---

// ডিসক্লেইমার

এই আর্টিকেলে CPU-কে ইচ্ছাকৃতভাবে অনেক সহজ করে দেখানো হয়েছে।

বাস্তব processor-এ pipeline, cache, branch prediction, out-of-order execution — এরকম আরও অনেক জটিল mechanism থাকে। একটা modern CPU একই সময়ে একাধিক instruction-এর বিভিন্ন stage handle করে, ভবিষ্যতে কী দরকার হবে সেটা আগেই অনুমান করে ডেটা load করে রাখে।

কিন্তু সেই সব complexity এই মৌলিক কাঠামোর উপরই দাঁড়িয়ে। ALU, register, bus, clock — এই চারজন সবাকিছুর মূল ভিত্তি।

---

// এই আর্টিকেলে কী শিখলাম

- **CPU কখনো "গণিত বোঝে" না।** Logic gate-এর arrangement-ই তাকে যোগ-বিয়োগ করতে বাধ্য করে। কোনো সিদ্ধান্ত নেওয়ার প্রক্রিয়া এখানে নেই।
- **Register হলো CPU-র নিজের ডেস্ক।** যে জিনিস নিয়ে এই মুহূর্তে কাজ হচ্ছে, সেটা এখানেই থাকে। RAM অনেক দূরে; register হাতের কাছে।
- **Clock তাল ঠিক করে, গতি না।** সবাই কখন কাজ শুরু করবে সেটা clock ঠিক করে দেয়। তালহীন CPU মানে corrupt CPU।
- **Bus হলো CPU-র হাইওয়ে; Mux আর decoder ট্রাফিক কন্ট্রোল।** ঠিক ডেটা ঠিক জায়গায় পৌঁছানোর দায়িত্ব এদের।

---

// পরের article-এ

একটা বিশাল প্রশ্ন এখনো বাকি রয়ে গেল।

এই উদাহরণে ধরে নেওয়া হয়েছিল CPU জানত তাকে যোগ করতে হবে। কিন্তু সে সেটা জানল কীভাবে?

কে বলল তাকে — "এবার Register A আর Register B যোগ করো"?

এই instruction কোথা থেকে এল? Memory-তে সেটা কীভাবে ছিল? আর কীভাবেই বা CPU-র ভেতরে এসে ঢুকল?

এখান থেকেই শুরু হচ্ছে CPU-র আসল গল্প — fetch-decode-execute।

**[পরের article: ৪. হার্টবিট: Fetch-Decode-Execute]**

---

# The CPU's blueprint

## What actually lives inside a processor?

Imagine the numbers `2` and `3` are sitting quietly somewhere in RAM, represented strictly as electrical voltages. Left alone, they do nothing. But the moment you write:

```python
result = 2 + 3
```

Within a few nanoseconds, the number `5` appears in memory.

The core question is mechanical: how does a literal slab of silicon "know" that 2 and 3 equal 5? It has no human brain. In this article, we will track these two numbers as they enter the CPU to see how a calculation executes at the bare-metal hardware level—with zero software or OS abstraction.

We will focus on how four primary internal components interact:

- **ALU (Arithmetic Logic Unit):** The execution unit where actual arithmetic happens.
- **Registers:** The CPU’s ultra-fast, local storage slots.
- **Data Bus:** The internal highway that moves bits between components.
- **Clock:** The oscillator that orchestrates the timing of every operation.

> **A Critical Distinction:** People often use "CPU" and "ALU" interchangeably, but they are not the same. The ALU is merely a department inside the CPU. Just as a kitchen is not the entire house—even though it's where the cooking happens—the ALU is not the entire processor. It handles the math, but the rest of the CPU coordinates the movement.
> 

---

## ALU: from logic gates to math

The place inside a CPU where math happens is the **ALU** — Arithmetic Logic Unit. Addition, subtraction, comparisons, and bitwise logic operations (like AND, OR, NOT) — all of that goes on here.

But there's no mysterious intelligence inside the ALU. It's built by wiring together the logic gates we saw in the previous article. Let's see how to build a circuit that adds two 1-bit binary numbers (say, A and B).

The rules of binary addition are straightforward:

- 0 + 0 = 00
- 0 + 1 = 01
- 1 + 0 = 01
- 1 + 1 = 10 (decimal 2)

Notice the pattern:

- **The right bit (Sum)** is 1 only when either A or B is 1, but 0 when both are 1. Exactly like an **XOR gate**.
- **The left bit (Carry)** is 1 only when both A and B are 1. Exactly like an **AND gate**.

Wire an XOR gate and an AND gate side by side, and you've built a **Half Adder.**

But there's a problem here.

A Half Adder can only add two individual bits. When humans add larger numbers, we carry a digit in our head — the Half Adder can't do that. So how would it handle 1111 + 0001?

The solution is the **Full Adder**. Same basic structure plus an extra input called "Carry In," which lets the carry from a previous bit feed into the next.

Now if a processor wants to add two 64-bit numbers?

The conceptual solution is to chain 64 Full Adders together in a series. Imagine a train where each carriage represents a single Full Adder. The first carriage passes its carry bit to the second, the second to the third, and that small electrical signal ripples all the way down to the 64th carriage. This architecture is known as a **Ripple Carry Adder**.

> **A Bitter Hardware Reality:** While this train analogy is perfect for teaching basic concepts, it is far too slow for modern high-performance CPUs. The time it takes for an electrical signal to sequentially ripple through 64 individual stages creates a massive propagation delay. At modern clock speeds of 3 to 5 GHz, this delay would choke the cycle time. Real CPUs utilize highly advanced architectures like **Carry-Lookahead Adders (CLA)** or **Prefix Adders**. These use parallel routing logic to compute the carry bits for all columns simultaneously, bypassing the sequential bottleneck.
> 

So the sum is calculated. But where does the sum get stored? Does the CPU send it straight to RAM? No — RAM is physically miles away in CPU timescales. The CPU requires hyper-fast, low-latency storage locations right inside the core itself to temporarily store operational inputs, intermediate variables, and immediate outputs. These internal memory cells are called **Registers**.

---

## Register: the CPU's own desk

When a CPU does math, it processes one value and then waits for the next. Fetching data from RAM takes a relatively long time because RAM is physically distant and architecturally slower. To bypass this, the CPU contains a set of ultra-fast internal memory cells right inside the core to hold immediate data—these are called **Register**.

What's a register, really? Remember the **Flip-flops** from the previous article? A register is simply a bunch of flip-flops sitting side by side in a row—like a row of adjacent passenger seats. A 64-bit register is just 64 flip-flops standing in line, each holding exactly 1 bit (0 or 1).

When taking a microprocessor course at university, the weird names like AX, BX, or PC can easily make a register sound like some mysterious, alien memory system. But the simple truth is that a register is nothing but the CPU's immediate scratchpad—a place to jot down the exact data it is actively working on.

The CPU now has a calculator (ALU) and fast slots to hold data (registers). But how does data actually move between them?

---

## Data bus, decoder, multiplexer: the information highway

*For simplicity, let's use three imaginary register names — Register A, Register B, and Register C. Real CPUs use different naming schemes, but they operate on identical principles.*

To move data between the internal components of a CPU, there's a set of connection lines called the data bus. Think of it as the CPU's internal highway for data. In a 64-bit CPU, the data bus is usually 64 wires wide — meaning 64 bits can travel in parallel at the same time.

But a highway without traffic control means chaos. Say the CPU has 5 registers, but at this moment only Register A and Register B need to send data to the ALU. The other 3 registers' data shouldn't accidentally end up in the ALU — and two special circuits handle that.

**Multiplexer (Mux) — Think of this as a traffic signal or an input switch.** It is a logic circuit that selects one input line from many and passes its data to the output. The multiplexer decides *which* register gets to pull onto the highway. Imagine a train station where trains are waiting on multiple platforms. Without a signal coordinator, letting them all move at once would cause a massive crash. The Mux acts as that coordinator, signaling that only the train from Register A is allowed to move right now.

**Decoder —** Think of this as a security guard opening a specific door. The decoder takes a binary address as an input, checks it, and decides which single door to unlock. It ensures that after the ALU finishes its calculation, the final result lands strictly inside **Register C** and nowhere else. It opens the gate for the target register while keeping all other register doors firmly shut.

[FIGURE 2: A block diagram of the CPU internal architecture. Show Register A and Register B connected via a Multiplexer to the inputs of the ALU. The output of the ALU connects back to Register C via the Data Bus. Show a Decoder activating the select lines. All components share a common clock line (dashed line). Caption: "CPU internal data flow: register, multiplexer, ALU connections."]

Together, decoder and multiplexer let the CPU decide — which register's data is being read right now, and where the ALU's result lands after the calculation.

But this whole circuit — when does data move, when does the ALU add, when does the register save — who keeps all this synchronized?

---

## Clock: the CPU's heartbeat

To synchronize data movement inside the CPU, there's an oscillator that sends out electrical pulses in a fixed rhythm. That's the clock. Every component in the CPU marches to those pulses, which keeps the entire system synchronized.

Clock speed is measured in GHz (gigahertz). If your processor runs at 3.0 GHz, the clock is pulsing 3 billion times per second.

With every tick, the CPU's flip-flops save their new values, and data moves to the next stage. Without a clock, data would arrive at circuits before those circuits were ready to receive it — and the whole system would corrupt itself.

Imagine an orchestra. If every musician starts playing whenever they feel like it, that's not an orchestra, it's chaos. But when the conductor waves their hand, everyone starts at the same instant. Every tick of the clock is like that hand-wave — telling billions of transistors "start now."

*One more thing — cranking up clock speed doesn't just make computers faster. Too fast means transistors generate too much heat, power consumption spikes, and eventually the circuit can't work stably. For today's story, this much is enough — the clock is the CPU's conductor, and every transistor marches to its beat.*

---

### 2 + 3 = 5: A Few Nanoseconds Inside the Hardware

Let's replay the microarchitecture journey of our two numbers for `result = 2 + 3`:

1. **Register State:** The numbers 2 and 3 are sitting quietly inside Register A and Register B as static voltage patterns.
2. **Clock Tick 1:** The clock ticks. Immediately, the Multiplexer triggers: *"Register A and B, proceed to the ALU."* The voltages for 2 and 3 rush through the data bus wires into the ALU inputs.
3. **The ALU Action:** Inside the ALU, current races through the chained logic gates and adders. In under a nanosecond, the electrical signals settle into a new voltage pattern representing 5 (`0101`).
4. **Clock Tick 2:** The clock ticks again. This time, the Decoder unlocks the gate for Register C. The voltage pattern for 5 travels down the bus and stabilizes inside Register C's flip-flops.

The entire sequence wraps up in a few nanoseconds. There is zero magic here—just voltage patterns, strategic logic gates, and a clock keeping time.

---

## Reality corner

We simplified the CPU on purpose in this article.

Real processors have pipelines, caches, branch prediction, out-of-order execution — many more layers of complexity. A modern CPU handles multiple instructions at different stages simultaneously, predicts what will be needed next, and preloads data accordingly.

But all of that complexity is built on this foundation. ALU, register, bus, clock — these four sit underneath everything.

---

## What this article covered

- **The CPU never "understands math."** The arrangement of logic gates forces it to add. There's no deliberation happening.
- **A register is the CPU's own desk.** Whatever it's actively working on sits here. RAM is too far; the register is right at hand.
- **The clock sets rhythm, not speed.** It decides when things start, not how fast they can go. A CPU without rhythm is a corrupt CPU.
- **The bus is the CPU's highway; the Mux and decoder are traffic control.** Getting the right data to the right place is their job.

---

## Next article

One huge question is still left over.

In this example we assumed the CPU knew it had to add. But how did it know that?

Who told it — "now add Register A and Register B"?

Where did that instruction come from? How was it in memory? How did it get inside the CPU?

That's where the real story of the CPU begins — fetch-decode-execute.

**[Next: 4. Heartbeat: Fetch-Decode-Execute]**

---
