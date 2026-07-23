# কোড থেকে মেশিন কোড

## আপনার JavaScript CPU-র কাছে কীভাবে পৌঁছায়?

আপনি লিখলেন:

```jsx
const x = 5 + 3;
console.log(x);
```

Node চালালেন। Screen-এ `8` দেখলেন।

কিন্তু আগের আর্টিকেলগুলোতে দেখেছি — CPU JavaScript বোঝে না। CPU শুধু machine code বোঝে, সেই hex numbers যা Article 4-এ দেখেছিলাম:

```
89 E5 83 EC 10 C7 45 FC ...
```

তাহলে মাঝখানে কী ঘটল? আপনার লেখা text কীভাবে CPU-র জন্য executable instruction হয়ে গেল?

এটাই আজকের গল্প।

---

// একটা কথা আগে বলে রাখি

এই সিরিজে এতদিন hardware আর OS দেখা হয়েছে। এই আর্টিকেল-এ software-এর একটা special layer দেখব — যেটা "translator" হিসেবে কাজ করে।

মূল প্রশ্ন সহজ: মানুষ যা লেখে (JavaScript, Python, C) আর CPU যা বোঝে (machine code) — এই দুইটার মাঝে অনুবাদ কে করে?

আজকে সেই অনুবাদকদের গল্প।

---

// প্রথম কথা: একজন অনুবাদক লাগবেই

একটা foreign language বই পড়তে চাইলে একজন অনুবাদক লাগে। Computer-এর ক্ষেত্রেও তেমনই। যেকোনো high-level language (JavaScript, Python, Go) থেকে CPU-র machine code পর্যন্ত পৌঁছাতে একটা translator software লাগবে। এই translator নিজেও একটা program, যেটা CPU-তে চলে।

কিন্তু translator-দের কাজের ধরন আলাদা। কেউ পুরো বইটা আগে থেকে অনুবাদ করে ছাপিয়ে দেয়। কেউ বাক্য পড়ে পড়ে on-the-spot বলে দেয়। কেউ আবার প্রথমে একটা middle language-এ নামায়, তারপর সেটা কেউ পড়ে।

এই ভিন্ন approach-গুলোর মধ্যে মূল কয়েকটা:

- **Compiler:** পুরো code আগে থেকে একবারে অনুবাদ করে (C, Go, Rust)।
- **Interpreter:** লাইন ধরে ধরে on-the-fly অনুবাদ করে (আদি Python, Bash)।
- **Bytecode + VM:** প্রথমে একটা intermediate language-এ নামানো হয়, তারপর সেটা interpret হয় (Java, Python, C#)।
- **JIT (Just-In-Time):** hybrid + smart — runtime-এ কোন কোন অংশ ঘন ঘন চালানো হচ্ছে সেটা লক্ষ্য করে, সেগুলোকে সরাসরি machine code-এ compile করে ফেলে (JavaScript's V8, JVM's HotSpot)।

একটা একটা করে দেখা যাক।

---

// Compiler: আগে থেকে অনুবাদক

Compiler এমন একটা program যেটা আপনার লেখা source code পুরোটা একবারে পড়ে, বুঝে, এবং machine code-এ রূপান্তরিত করে। এই process-এর নাম **compilation**।

কল্পনা করুন একজন professional book translator। সে পুরো বাংলা বই পড়ে, পুরোটা ইংরেজিতে অনুবাদ করে, ছাপিয়ে বাজারে দিয়ে দেয়। এরপর যে-ই পড়তে চায়, সে ইংরেজি version পড়বে — বাংলা original আর অনুবাদক দুইজনের কারো আর দরকার নেই।

Compiler-এর কাজও একই। আপনি C-তে লিখলেন `hello.c`। Compiler run করলেন:

```
gcc hello.c -o hello
```

Compiler `hello.c` পড়ল, বুঝল, machine code তৈরি করল, `hello` নামে একটা executable file তৈরি করে দিল। এখন `./hello` চালান — compiler-এর আর দরকার নেই। CPU সরাসরি machine code চালাচ্ছে।

**সুবিধা:**

- একবার compile হয়ে গেলে, প্রতিবার চালানোর সময় আর অনুবাদ করতে হয় না। **তাই খুব দ্রুত।**
- Compile করার সময় compiler পুরো code দেখে, তাই optimize করার অনেক সুযোগ পায়।
- Compiled binary distribute করা যায় source code ছাড়াই।

**অসুবিধা:**

- Small change করলেও পুরো code আবার compile করতে হয়।
- এক platform-এ compile করা code অন্য platform-এ চলে না (Windows binary Linux-এ চলবে না)।
- Compile করার আগে code-এ syntax error থাকলে ধরা পড়ে, কিন্তু runtime error তখনও ধরা যাবে না।

C, Go, Rust — এদের কেউ interpreter-এর সাথে চলে না। আপনি compile করে binary বানাবেন, তারপরই চালাতে পারবেন।

---

// Interpreter: On-the-fly অনুবাদক

Interpreter সম্পূর্ণ ভিন্ন approach নেয়। এটা compile-এর মতো "আগে থেকে সব অনুবাদ" করে না। বরং, code চালানোর সময়, লাইন ধরে ধরে অনুবাদ করে execute করে।

কল্পনা করুন UN meeting-এর live translator। একজন যা বলছেন, translator সাথে সাথে অনুবাদ করে বলছেন। বই আকারে কিছু ছাপা হচ্ছে না — real-time-এই কাজ চলছে।

Interpreter-এর কাজ ঠিক একই। আপনি Python-এ `hello.py` লিখলেন। চালালেন:

```
python hello.py
```

Python interpreter `hello.py` file open করল, প্রথম line পড়ল, execute করল, দ্বিতীয় line পড়ল, execute করল — এভাবে line by line চলতে থাকল। কোনো binary file তৈরি হলো না। Interpreter ছাড়া code চলবে না।

**সুবিধা:**

- Immediate feedback। Code লেখা মাত্রই চালানো যায়, compile step নেই।
- Platform-independent। যেকোনো OS-এ Python installed থাকলেই code চলবে।
- Dynamic behavior সহজ — runtime-এ code generate করে চালানো, reflection, ইত্যাদি।

**অসুবিধা:**

- Compile-এর মতো optimization পাওয়া যায় না। **তাই ধীর।**
- Interpreter সবসময় user-এর কাছে থাকতে হবে। শুধু code পাঠালে চলবে না, target machine-এ Python installed থাকতে হবে।
- Loop যদি ১০০০ বার চলে, একই লাইন interpreter ১০০০ বার পড়ে অনুবাদ করে — অনেক redundant work।

---

// দুটোর মাঝামাঝি: Bytecode + Virtual Machine

Compile-এর speed আছে কিন্তু flexibility নেই। Interpret-এর flexibility আছে কিন্তু speed নেই। যদি দুইটার সুবিধা একসাথে পেতে চান, কী করবেন?

এই সমস্যার সমাধান হিসেবে এসেছে একটা hybrid approach। Source code সরাসরি machine code-এ না গিয়ে, একটা **intermediate representation**-এ নেমে আসে — যাকে বলে **bytecode**। এই bytecode CPU-র জন্য নয়, একটা virtual machine (VM)-এর জন্য designed। VM নিজে একটা program, যেটা এই bytecode interpret করে।

কল্পনা করুন — বাংলা বই ইংরেজিতে অনুবাদ করার বদলে Esperanto-তে নামানো হলো (একটা কল্পিত universal language)। পৃথিবীর যেকোনো ভাষার লোক Esperanto-জানা একটা reader নিয়ে এলেই সে সেটা পড়তে পারবে।

Java-র বিখ্যাত slogan মনে আছে? "Write once, run anywhere।" এটা exactly এই idea। Java code → bytecode (`.class` file) → JVM (Java Virtual Machine) সেই bytecode interpret করে। JVM যেকোনো platform-এ install করা যায়, তাই একই bytecode Windows, Linux, Mac-এ চলে।

Python-ও একই approach নেয়। আমি অনেক দিন Python-কে pure interpreted ভাষা মনে করতাম। যতদিন না একদিন project folder-এ `__pycache__` folder দেখলাম — ভেতরে অনেকগুলো `.pyc` file। ভাবলাম, "এগুলো কী?" খুঁজে বার করলাম — Python actually source code-কে প্রথমে bytecode-এ compile করে, তারপর সেই bytecode-কে VM-এর মতো interpret করে। মানে Python কড়া অর্থে interpreted না, hybrid।

তাহলে Python কি compiled না interpreted? উত্তর — দুইটাই। Modern language-এ এই পার্থক্যটা আর তেমন meaningful না।

---

// JIT: যে Interpreter শিখে যায়

Bytecode + VM approach ভালো, কিন্তু execution তবু interpreter-এর মতো ধীর। কারণ VM প্রতিটা bytecode instruction পড়ে বুঝে execute করে। C-র মতো native speed পাওয়া যায় না।

এখানেই আসে সবচেয়ে চতুর approach — **JIT (Just-In-Time compilation)**।

JIT একটা smart interpreter। প্রথমে সে interpreter-এর মতোই চলে — bytecode পড়ে execute করে। কিন্তু একই সাথে monitor করে — কোন কোন function বা loop বেশি বেশি চালানো হচ্ছে। যেগুলো "hot" (ঘন ঘন execute হচ্ছে), সেগুলোকে সে runtime-এ compile করে ফেলে native machine code-এ। পরের বার সেই function/loop চলার সময় interpret করে না — সরাসরি সেই compiled version চালায়।

কল্পনা করুন — একজন live translator শুরুতে সব বাক্য অনুবাদ করছে। কিন্তু কয়েকটা phrase বারবার আসছে ("Ladies and gentlemen", "As I was saying")। ১০ বার শোনার পর সে সেই phrase-এর অনুবাদ মুখস্থ করে ফেলল। এখন সেই phrase শুনলেই সে reflex-এ instant অনুবাদ বলে দেয় — চিন্তা করে না। JIT-এর কাজ ঠিক এভাবেই।

আধুনিক JavaScript-এর incredible speed-এর কারণ এই JIT। V8 (Chrome আর Node-এর engine) shockingly optimized — hot code paths native machine code-এ compile করে C-র কাছাকাছি speed দেয়। JVM-এর HotSpot compiler-এর নাম-ই বলে দিচ্ছে কী কাজ করে।

Trade-off আছে — JIT compilation নিজেই সময় খায়। তাই startup সাধারণত ধীর (interpreter mode-এ শুরু হয়)। কিন্তু long-running code দ্রুততর হতে থাকে।

---

// যখন আপনি `node hello.js` চালান

এবার সব একসাথে করে দেখা যাক। আপনি লিখলেন:

```jsx
function square(x) {
    return x * x;
}

for (let i = 0; i < 1000; i++) {
    console.log(square(i));
}
```

`node hello.js` চালালেন। কী কী ঘটে?

1. Node startup — V8 engine load হয়।
2. V8 আপনার code পড়ে, syntax parse করে, একটা internal representation (AST) তৈরি করে।
3. AST থেকে V8 bytecode তৈরি করে।
4. V8 bytecode interpret করে execute শুরু করে (interpreter mode)।
5. `square()` function কয়েকবার call হওয়ার পর V8 বুঝে যায় "এটা hot"। JIT compiler activate।
6. JIT `square()` function-কে optimized machine code-এ compile করে।
7. পরের call-গুলোতে interpret না — সরাসরি compiled machine code চলে।
8. Loop-এর body-ও একই ভাবে JIT-compile হয়।
9. Result — C-র কাছাকাছি speed।

এই পুরো process আপনার কাছে invisible। আপনি শুধু দেখছেন output। কিন্তু ভেতরে source code → AST → bytecode → interpreted execution → JIT-compiled native code — একটা elegant pipeline।

---

// আধুনিক জটিলতা: সীমানা মুছে যাচ্ছে

আধুনিক language landscape-এ "compiled vs interpreted" পার্থক্যটা প্রায় artificial হয়ে গেছে। প্রায় প্রতিটা modern language-ই hybrid:

- **Python:** Source → bytecode → CPython VM interprets। PyPy আবার JIT-compilation যোগ করে।
- **JavaScript:** V8 এবং SpiderMonkey JIT-compilation-এর poster child।
- **Java:** JVM bytecode interprets, HotSpot JIT hot code compile করে।
- **C#:** Similar — CLR bytecode, JIT compilation।
- **Go, Rust:** সরাসরি native compilation, তবে কিছু runtime feature আছে।
- **C++:** Ahead-of-Time compilation, তবে template-heavy code JIT-এর মতো specialization করে।

এই world-এ "কি compiled নাকি interpreted?" প্রশ্নটা অনেক সময় sensible না। বেশি sensible প্রশ্ন — "startup fast, নাকি long-run fast?" "Portable binary চাই, নাকি একবার compile করে সব platform-এ চলবে এমন কিছু?"

---

// এই আর্টিকেলে কী শিখলাম

- **CPU শুধু machine code বোঝে।** যেকোনো high-level language থেকে সেখানে পৌঁছাতে একজন translator লাগবেই।
- **Compiler আগে থেকে translate করে, interpreter runtime-এ।** সরাসরি speed vs flexibility-এর trade-off।
- **Bytecode + VM দুটোর মাঝামাঝি।** Compile হয় একটা intermediate form-এ, তারপর interpret হয়।
- **JIT এই approach-এই smart layer যোগ করে।** Hot code runtime-এ native machine code-এ compile হয়ে যায়।
- **Modern language সবই hybrid।** "Compiled vs interpreted" পার্থক্য অনেকাংশে artificial হয়ে গেছে।

---

// পরের article-এ

Article 1 থেকে এখান পর্যন্ত — voltage থেকে JIT compilation পর্যন্ত — সব দেখা হলো।

কিন্তু এই সিরিজের একটা মূল প্রশ্ন এখনো ঝুলে আছে। প্রথম আর্টিকেলে জিজ্ঞেস করেছিলাম — `x = 5` লিখলে কী হয়? এখন জানি।

আজ শেষ প্রশ্ন — আপনি keyboard-এ 'A' চাপলেন, screen-এ 'A' এল। মাঝখানে কী কী ঘটল? এই সিরিজের প্রতিটা আর্টিকেলের সব concept ব্যবহার করে সেই journey-টা দেখব।

এই সিরিজের payoff, final article।

**[পরের article: ৮. Keyboard-এর 'A' থেকে Screen-এর 'A']**

---

### Hover Definitions

**[HOVER: Bytecode]***Bytecode হলো একটা intermediate language — মানুষের source code-এর চেয়ে নিচে, কিন্তু CPU-র machine code-এর চেয়ে উপরে। VM (Virtual Machine) এই bytecode পড়ে execute করে। Java-র `.class` file, Python-এর `.pyc` file — সবই bytecode।*

**[HOVER: Virtual Machine (VM)]***Software-এ implemented একটা "কল্পিত computer" যা bytecode চালায়। VM নিজে একটা program, যেটা real CPU-তে চলে। JVM (Java Virtual Machine), CPython VM — এই sense-এ VM। এটাকে virtualization-এর VM (VirtualBox, VMware)-এর সাথে গুলিয়ে ফেলবেন না — সেটা আলাদা concept।*

# From Code to Machine Code

## How does your JavaScript reach the CPU?

You wrote:

```jsx
const x = 5 + 3;
console.log(x);
```

Ran Node. Saw `8` on screen.

But we've seen in earlier articles — the CPU doesn't understand JavaScript. The CPU only understands machine code, those hex numbers from Article 4:

```
89 E5 83 EC 10 C7 45 FC ...
```

So what happened in between? How did the text you wrote become executable CPU instructions?

That's today's story.

---

## One thing to clear up first

This series has covered hardware and the OS so far. In this article we look at a special layer of software — one that works as a translator.

The core question is simple: what people write (JavaScript, Python, C) and what the CPU understands (machine code) — who does the translation between them?

Today, the story of those translators.

---

## First thing: you always need a translator

To read a book in a foreign language, you need a translator. Same for computers. Getting from any high-level language (JavaScript, Python, Go) down to the CPU's machine code requires translator software. That translator is itself a program, running on the CPU.

But translators work in different ways. Some translate the entire book ahead of time and print it. Some read sentence by sentence and speak it out on the spot. Some first bring it down to a middle language, and then someone else reads that.

The main approaches:

- **Compiler:** Translates the entire code ahead of time, all at once (C, Go, Rust).
- **Interpreter:** Translates line by line on the fly (early Python, Bash).
- **Bytecode + VM:** First comes down to an intermediate language, then that gets interpreted (Java, Python, C#).
- **JIT (Just-In-Time):** Hybrid and smart — watches which parts run frequently at runtime, then compiles those directly to machine code (JavaScript's V8, JVM's HotSpot).

Let's take them one at a time.

---

## Compiler: the ahead-of-time translator

A compiler is a program that reads your entire source code, understands it, and converts it into machine code. That process is called **compilation**.

Picture a professional book translator. They read the whole Bangla book, translate the whole thing into English, print it, and send it to bookstores. From then on, anyone who wants to read it reads the English version — neither the original nor the translator is needed anymore.

A compiler works the same way. You write `hello.c` in C. You run the compiler:

```
gcc hello.c -o hello
```

The compiler reads `hello.c`, understands it, produces machine code, and creates an executable file named `hello`. Now run `./hello` — the compiler isn't needed anymore. The CPU is running machine code directly.

**Advantages:**

- Once compiled, no translation happens at run time. **So it's very fast.**
- The compiler sees the whole program during compilation, giving it many opportunities to optimize.
- Compiled binaries can be distributed without shipping the source code.

**Disadvantages:**

- Any small change means recompiling the whole thing.
- Code compiled for one platform won't run on another (a Windows binary won't run on Linux).
- Syntax errors get caught at compile time, but runtime errors still won't be found until it runs.

C, Go, Rust — none of these run through an interpreter. You compile to a binary first, then you can run it.

---

## Interpreter: the on-the-fly translator

An interpreter takes a completely different approach. It doesn't translate everything ahead of time. Instead, while running the code, it translates and executes line by line.

Picture a live translator at a UN meeting. As someone speaks, the translator immediately renders it in another language. Nothing gets printed as a book — it all happens in real time.

An interpreter works the same way. You write `hello.py` in Python. You run it:

```
python hello.py
```

The Python interpreter opens `hello.py`, reads the first line, executes it, reads the second line, executes it — and keeps going line by line. No binary file gets created. Without the interpreter, the code can't run.

**Advantages:**

- Immediate feedback. Write code, run it right away, no compile step.
- Platform independent. Code runs on any OS that has Python installed.
- Dynamic behavior is easy — generating and running code at runtime, reflection, and so on.

**Disadvantages:**

- Doesn't get the optimizations a compiler can do. **So it's slower.**
- The interpreter has to be present on the user's machine. Shipping just the code isn't enough; the target machine needs Python installed.
- If a loop runs 1000 times, the interpreter reads and translates the same lines 1000 times — a lot of redundant work.

---

## The middle ground: Bytecode + Virtual Machine

Compilation gives speed but not flexibility. Interpretation gives flexibility but not speed. What if you want both?

The solution is a hybrid approach. Instead of going directly from source code to machine code, the code comes down to an **intermediate representation** — called **bytecode**. This bytecode isn't for the CPU; it's designed for a virtual machine (VM). The VM is itself a program that interprets this bytecode.

Picture this — instead of translating the Bangla book into English, you translate it into Esperanto (a made-up universal language). Now anyone in the world can read it, as long as they bring a reader who knows Esperanto.

Remember Java's famous slogan? "Write once, run anywhere." That's exactly this idea. Java code → bytecode (`.class` files) → the JVM (Java Virtual Machine) interprets that bytecode. The JVM can be installed on any platform, so the same bytecode runs on Windows, Linux, and Mac.

Python takes the same approach. For a long time I thought Python was a purely interpreted language. Then one day I noticed a `__pycache__` folder in a project directory, full of `.pyc` files. "What are these?" I looked it up — Python actually compiles source code to bytecode first, then interprets that bytecode in a VM. Which means Python isn't strictly interpreted; it's a hybrid.

So is Python compiled or interpreted? The answer — both. In modern languages, that distinction isn't very meaningful anymore.

---

## JIT: the interpreter that learns

The bytecode + VM approach is good, but execution is still interpreter-slow. Because the VM reads, understands, and executes each bytecode instruction one at a time. You don't get native speed like C.

This is where the cleverest approach comes in — **JIT (Just-In-Time compilation)**.

JIT is a smart interpreter. It starts out running like an interpreter — reading and executing bytecode. But at the same time, it monitors which functions or loops are being run frequently. The ones that are "hot" (executed over and over), it compiles at runtime into native machine code. The next time that function or loop runs, it doesn't get interpreted — the compiled version runs directly.

Picture this — a live translator starts out translating every sentence. But some phrases keep repeating ("Ladies and gentlemen," "As I was saying"). After hearing them ten times, the translator memorizes their translation. Now, hearing that phrase, they say the translation reflexively — no thinking required. That's exactly what JIT does.

The incredible speed of modern JavaScript comes from JIT. V8 (the engine behind Chrome and Node) is shockingly optimized — it compiles hot code paths to native machine code and gets close to C-level speed. The JVM's HotSpot compiler is named for exactly this behavior.

There's a trade-off — JIT compilation itself takes time. So startup is usually slower (it begins in interpreter mode). But long-running code keeps getting faster.

---

## When you run `node hello.js`

Let's put it all together. You wrote:

```jsx
function square(x) {
    return x * x;
}

for (let i = 0; i < 1000; i++) {
    console.log(square(i));
}
```

You ran `node hello.js`. What happens?

1. Node starts up — the V8 engine loads.
2. V8 reads your code, parses the syntax, and builds an internal representation (an AST).
3. From the AST, V8 generates bytecode.
4. V8 starts interpreting and executing that bytecode (interpreter mode).
5. After `square()` gets called a number of times, V8 recognizes "this is hot." The JIT compiler activates.
6. JIT compiles `square()` into optimized machine code.
7. Subsequent calls don't get interpreted — the compiled machine code runs directly.
8. The loop body gets JIT-compiled the same way.
9. Result — close to C-level speed.

The whole process is invisible to you. You just see output. But inside: source code → AST → bytecode → interpreted execution → JIT-compiled native code — an elegant pipeline.

---

## Modern complexity: the boundaries are dissolving

In the modern language landscape, the "compiled vs interpreted" distinction has become almost artificial. Nearly every modern language is hybrid:

- **Python:** Source → bytecode → CPython VM interprets. PyPy adds JIT compilation on top.
- **JavaScript:** V8 and SpiderMonkey are the poster children of JIT compilation.
- **Java:** The JVM interprets bytecode; HotSpot JIT-compiles hot code.
- **C#:** Similar — CLR bytecode, JIT compilation.
- **Go, Rust:** Direct native compilation, though some runtime features exist.
- **C++:** Ahead-of-time compilation, but template-heavy code does JIT-like specialization at compile time.

In this world, "is it compiled or interpreted?" is often the wrong question. The more useful question is — "is startup fast, or is long-run fast?" "Do I want a portable binary, or something I compile once that runs everywhere?"

---

## What this article covered

- **The CPU only understands machine code.** Getting there from any high-level language requires a translator.
- **A compiler translates ahead of time; an interpreter translates at runtime.** The trade-off is speed vs flexibility.
- **Bytecode + VM sits in between.** Code compiles to an intermediate form, then that gets interpreted.
- **JIT adds a smart layer on top.** Hot code gets compiled to native machine code at runtime.
- **Modern languages are all hybrids.** The "compiled vs interpreted" distinction has become largely artificial.

---

## Next article

From Article 1 to here — from voltage to JIT compilation — we've covered everything.

But one core question of this series is still hanging. In the first article I asked — what happens when you write `x = 5`? Now we know.

Today, the last question — you press 'A' on your keyboard, 'A' appears on screen. What happened in between? We'll walk through that journey using every concept from this series.

The payoff of this series, the final article.

**[Next: 8. From the Keyboard's 'A' to the Screen's 'A']**

---

### Hover Definitions

**[HOVER: Compiler]***A compiler is a program that reads an entire source file and converts it, all at once, into machine code (or bytecode). The output is usually an executable file that can run without the compiler. C's gcc, Rust's rustc, Go's go build — all compilers.*

**[HOVER: Interpreter]***An interpreter is a program that reads source code line by line, understands it, and executes it immediately. No binary output is created — the interpreter is needed every time the code runs. Pure interpreters are rare today — most modern "interpreted" languages actually compile to bytecode and run it on a VM.*

**[HOVER: Bytecode]***Bytecode is an intermediate language — lower level than human source code, but higher level than the CPU's machine code. A VM (Virtual Machine) reads and executes this bytecode. Java's `.class` files, Python's `.pyc` files — all bytecode.*

**[HOVER: Virtual Machine (VM)]***A software-implemented "imaginary computer" that runs bytecode. The VM is itself a program running on a real CPU. The JVM (Java Virtual Machine) and the CPython VM are VMs in this sense. Don't confuse this with virtualization VMs (VirtualBox, VMware) — that's a different concept.*

**[HOVER: JIT]***JIT (Just-In-Time compilation) is the technique of compiling code at runtime. A program starts in interpreter mode, but frequently-executed code (hot paths) gets compiled into native machine code during execution. From then on, that code isn't interpreted — it runs natively. V8 (JavaScript), HotSpot (Java), PyPy — all JIT compilers.*
