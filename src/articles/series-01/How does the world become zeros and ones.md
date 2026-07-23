# ডিজিটাল রূপান্তর: শূন্য আর একের গল্প

## Text, image, sound-এর ভেতরের অনুবাদক

ধরুন, একটা কাগজে "Hello" লিখে আপনার সামনে ধরলাম। আপনি বুঝবেন এটা পাঁচটা অক্ষর, একটা শব্দ। যদি একটা বিড়ালের ছবি দেখাই, বুঝবেন এটা একটা প্রাণীর ছবি। MP3 চালালে শুনবেন একটা গান।

কিন্তু কম্পিউটার এগুলোর কোনোটাই দেখে না। কম্পিউটারের কাছে "Hello" শব্দটা, বিড়ালের ছবি, আর আপনার প্রিয় গান — সব আসলে একই জিনিস। শুধু ০ আর ১।

আগের আর্টিকেলে জেনেছি একটা bit physically কেমন করে বেঁচে থাকে — voltage-এর একটা state, flip-flop-এ আটকানো।

কিন্তু, বাস্তব জগতের একটা অক্ষর, একটা রঙ, একটা সুর — এগুলো memory-তে ঢোকার আগে কীভাবে ০ আর ১-এ রূপ নেয়? সেই translation-এর গল্পটাই আজকের বিষয়।

---

// প্রথম নিয়ম: সবকিছু আগে সংখ্যা হবে

একটা কথা মাথায় রাখা দরকার। কম্পিউটারের একটাই কাজ জানা আছে — voltage ধরে রাখা। High বা low। ১ বা ০।

আর voltage-এর combination দিয়ে সে যা প্রকাশ করতে পারে, সেটা শুধুই সংখ্যা। এর বাইরে কিছু না।

এই নিয়ম মেনেই বাকিসব বানানো হয়েছে। যদি text চান — প্রথমে সেই text-কে সংখ্যায় রূপান্তর করতে হবে। যদি ছবি চান — সেটাও প্রথমে সংখ্যায় ভাঙতে হবে। Sound-এর ক্ষেত্রেও একই কথা।

তারপর সেই সংখ্যা binary-তে রূপ নেয়, আর সেই binary voltage হিসেবে memory-তে ঢুকে যায়।

তাহলে প্রথম প্রশ্ন — সংখ্যা নিজেই কীভাবে binary হয়?

---

// সংখ্যা থেকে binary

মানুষ base-10 বা ডেসিমাল সিস্টেম ব্যবহার করে। কেন? সম্ভবত কারণটা সহজ — আমাদের ১০টা আঙুল আছে। ০ থেকে ৯ পর্যন্ত ১০টা digit, আর প্রতিটা column-এর মান ১০-এর power হিসেবে বাড়ে — একক, দশক, শতক, সহস্র।

কম্পিউটারের সুইচ বা transistor বোঝে মাত্র দুইটা state — on বা off। তাই তার জন্য বানানো হয়েছে base-2 বা binary সিস্টেম। এখানে digit শুধু দুইটা (০ আর ১), আর প্রতিটা column-এর মান ২-এর power হিসেবে বাড়ে — ১, ২, ৪, ৮, ১৬, ৩২ — এভাবে।

কেন ঠিক ২-এর power? কারণটা মজার। প্রতিটা নতুন bit আসলে আগের সব bit-এর ক্ষমতাকে দ্বিগুণ করে দেয়। এক bit-এ দুইটা possibility থাকে (০ অথবা ১)। দুই bit যোগ করলে চারটা possibility (০০, ০১, ১০, ১১)। তিন bit-এ আটটা, চার bit-এ ষোলটা। এভাবেই সম্ভাবনার সংখ্যা exponentially বাড়তে থাকে।

তাহলে এই বাইনারি কলামগুলো দিয়ে আমরা সংখ্যা বানাবো কীভাবে? নিয়মটা সহজ: **যে যে কলামের মান আপনার যোগ করতে হবে, সেগুলোকে `1` (ON) করে দিন, আর বাকিগুলোকে `0` (OFF)।**

[Animation 1: Increasing bit exponentially increasing possibility and conversion of decimal 13 to binary 1101, how power of 2 is being used here]

উদাহরণ হিসেবে, ডেসিমাল ১৩ সংখ্যাটার কথা ধরা যাক। আমাদের কলামগুলো হলো ৮, ৪, ২, ১। ১৩ বানাতে আমাদের লাগবে একটা ৮, একটা ৪, এবং একটা ১ (যেহেতু $৮ + ৪ + ১ = ১৩$). ২ আমাদের লাগছে না। তাই বাইনারিতে এর রূপ হবে `1101`।

গণিতের ভাষায় হিসাবটা দাঁড়ায় এরকম:

$$1101_2 = (1 \times 8) + (1 \times 4) + (0 \times 2) + (1 \times 1) = 13_{10}$$

পজিটিভ সংখ্যা তো বুঝলাম, কিন্তু কম্পিউটার মাইনাস (-) চিহ্ন মেমরিতে রাখবে কীভাবে? মেমরিতে তো প্লাস-মাইনাস বলতে কিছু নেই, আছে শুধু ভোল্টেজ।

প্রথম দেখায় মনে হতে পারে, আমরা হয়তো বাইনারি সংখ্যার একদম বামের বিটটাকে (Most Significant Bit) সাইন নির্ধারণের জন্য রেখে দিতে পারি—`0` মানে প্লাস, `1` মানে মাইনাস। এই পদ্ধতিকে বলা হয় **Sign-Magnitude**। কিন্তু এই সরল চিন্তার মধ্যে একটা বড় খুঁত আছে। এভাবে হিসেব করলে কম্পিউটারে `+0` এবং `-0` নামে দুটি আলাদা বাইনারি রূপ তৈরি হয় (যেমন ৮-বিটে `00000000` এবং `10000000`)। গণিতে শূন্যের কোনো সাইন হয় না, আর হার্ডওয়্যার লেভেলে দুটি আলাদা শূন্যের অস্তিত্ব থাকা মানেই যোগ-বিয়োগের লজিক সার্কিট জটিল হয়ে যাওয়া।

এই সমস্যার সবচেয়ে চমৎকার এবং ইঞ্জিনিয়ারিং-বান্ধব সমাধান হলো **[HOVER: Two's Complement]**।

এখানে নেগেটিভ সংখ্যা বের করার ট্রিকটা খুব সহজ: প্রথমে সংখ্যাটির পজিটিভ রূপের প্রতিটা বিট উল্টে দিন (`0` কে `1` আর `1` কে `0` করুন, যাকে বলে One's Complement), তারপর সেই ফলের সাথে জাস্ট `1` যোগ করুন। এই এক নিয়মেই পজিটিভ এবং নেগেটিভ সংখ্যার সাধারণ যোগ-বিয়োগ একই ALU (Arithmetic Logic Unit) সার্কিট দিয়ে বাড়তি কোনো প্লাস-মাইনাস লজিক ছাড়াই পানির মতো নিখুঁতভাবে করা সম্ভব হয়।

সংখ্যা তো হলো। কিন্তু বাস্তব জীবনে আপনি তো শুধু সংখ্যা লেখেন না। যখন চ্যাটবক্সে "Hello" লেখেন, সেই অক্ষরগুলো কীভাবে binary হয়?

---

// তথ্য যদি হয় text

Text-কে binary বানানোর ট্রিকটা খুব সহজ — প্রতিটা অক্ষরের জন্য একটা করে নির্দিষ্ট সংখ্যা বরাদ্দ করা।

Computing-এর একেবারে শুরুর দিকে এই standard-এর নাম ছিল [HOVER: ASCII]। প্রতিটা ইংরেজি অক্ষর, digit, punctuation — সবার জন্য একটা করে ৭-bit code:

- বড় হাতের `A` → ডেসিমাল 65 → binary `01000001`
- ছোট হাতের `a` → ডেসিমাল 97 → binary `01100001`

ইংরেজির জন্য ASCII ঠিকঠাকই কাজ করত। কিন্তু সমস্যা শুরু হলো যখন অন্য ভাষা বা emoji-র প্রয়োজন পড়ল। ৭ bit দিয়ে সর্বোচ্চ ১২৮টা character-এর জায়গা হয়। শুধু বাংলা বর্ণমালার সব অক্ষর ধরার মতোই সেখানে জায়গা নেই, পৃথিবীর হাজার হাজার ভাষার কথা তো বাদই দিলাম।

শুরুর দিকে যখন Python বা C দিয়ে database-এ বাংলা input নেওয়া হতো, প্রায়ই screen-এ কিছু অদ্ভুত হিজিবিজি character দেখাত — `åŠ©æ‰‹` বা `\xE0\xB6...`।  প্রোগ্রামারেরা ভাবতো, আমি লিখলাম বাংলা, screen-এ কেন এই garbage? এগুলো আবার কি?

Computer আসলে বাংলা character-কে ভুল dictionary দিয়ে decode করার চেষ্টা করছিল। ASCII-র dictionary-তে বাংলা নেই। ছিলই না।

এই সমস্যার সমাধান হলো [HOVER: Unicode] — একটা international standard, যেটা পৃথিবীর প্রতিটা ভাষার প্রতিটা character-এর জন্য একটা করে unique **code point** নির্ধারণ করে দেয়।

এখানে একটা সূক্ষ্ম পার্থক্য আছে যেটা বেশিরভাগ মানুষ ধরতে পারে না, কারণ Unicode আর UTF-8 কথাগুলো প্রায়ই interchangeably ব্যবহার হয়। কিন্তু এরা এক জিনিস না।

**Unicode বলে দেয় প্রতিটা character-এর পরিচয়পত্র কী হবে।**

**আর সেই পরিচয়পত্রটা memory-তে actual bit হিসেবে কীভাবে লেখা হবে — সেটা বলে UTF-8।**

Unicode একটা mapping — পরিচয় বণ্টনের নিয়ম। UTF-8 হলো encoding — সেই পরিচয়কে actual bit-এ রূপান্তরের নিয়ম।

[HOVER: UTF-8] হলো একটা variable-width encoding। ইংরেজি অক্ষরের জন্য এটা ৮ bit (১ byte) ব্যবহার করে — যেটা ASCII-র সাথে পুরোপুরি backward-compatible। কিন্তু বাংলা character বা কোনো জটিল emoji (🍕) রিপ্রেজেন্ট করতে গেলে এটা নিজে থেকে জায়গা বাড়িয়ে ৩২ bit (৪ byte) পর্যন্ত নিতে পারে।

যেহেতু একটা অক্ষরের জন্য তখন একের অধিক byte লাগছে, মেমরিতে এই byte-গুলো কোন সিরিয়ালে বসবে ([HOVER: Endianness]) সেটাও কম্পিউটারকে হিসাব করতে হয়।

[ANIMATION 1: A single Bangla character 'ক' at the top. Arrow down. Label: "Unicode assigns identity → U+0995". Arrow down. Label: "UTF-8 encodes into bits". Arrow down. Show the final binary with highlighted byte-markers: **1110**0000 **10**100110 **10**010101. (Highlight the '1110' and '10' bits in a distinct color to show how UTF-8 flags a 3-byte character). Caption: "একটা অক্ষর কীভাবে bit হয় — দুইটা layer, একটা identity, একটা encoding এবং multi-byte নির্দেশক marker।"]

Text-এর গল্প এতটুকুই। তথ্যের সেই টুকরো যদি একটা অক্ষর হতো, এতক্ষণে সে binary হয়ে memory-তে ঢোকার জন্য প্রস্তুত।

কিন্তু তথ্য যদি ছবির একটা অংশ হয়?

---

// তথ্যের টুকরো যদি হয় image

যেকোনো digital ছবিকে খুব কাছ থেকে দেখলে দেখা যাবে, এটা আসলে কোটি কোটি ক্ষুদ্রাতিক্ষুদ্র বিন্দুর সমষ্টি। প্রতিটা বিন্দুকে বলে **pixel**।

Screen-এ রঙ তৈরি করার জন্য ব্যবহার হয় RGB model। প্রতিটা pixel মূলত তিনটা primary color-এর মিশ্রণ — **Red**, **Green**, **Blue**।

প্রতিটা color কতটা উজ্জ্বল হবে, সেটার জন্য ০ থেকে ২৫৫ পর্যন্ত একটা brightness value দেওয়া হয়। ২৫৫ মানে সর্বোচ্চ উজ্জ্বলতা, ০ মানে সম্পূর্ণ off। ২৫৫ পর্যন্ত সংখ্যা store করতে প্রতি color channel-এর জন্য ৮ bit (১ byte) লাগে।

তাহলে একটা pixel-এর রঙ প্রকাশ করতে মোট প্রয়োজন: ৮ + ৮ + ৮ = ২৪ bit। এটাকেই বলে **24-bit color depth**:

- একটা সম্পূর্ণ লাল pixel: `255, 0, 0` → `11111111 00000000 00000000`
- একটা বেগুনি pixel: `128, 0, 128` → `10000000 00000000 10000000`

[FIGURE 1: A grid of 4x4 pixels zoomed in, each pixel showing its RGB value (e.g., Red, Purple, Black, White) and how the computer sees it as a continuous stream of 24-bit binary packages. Caption: "Pixel grid থেকে binary stream।"]

Computer এই pixel value-গুলোকে row-by-row সাজিয়ে পুরো ছবিটাকে memory-তে একটা bit sequence হিসেবে লিখে রাখে।

এই জায়গায় একটা হিসাব করে দেখা যাক। আপনার screen যদি 1920×1080 resolution-এর হয়, তাহলে এক মুহূর্তে প্রায় ২০ লক্ষ pixel-এর রঙ আলাদাভাবে মনে রাখতে হয়। প্রতিটার জন্য ২৪ bit। মানে শুধু একটা frame render করতেই লাগবে ৬ MB। কিন্তু বাস্তবে একটা ছবি বা ভিডিওর একটা ফ্রেম তো এত জায়গা নেয় না। কিভাবে? সেই গল্প একটু পরে।

Image-এর গল্পও শেষ। কিন্তু কান দিয়ে যা শুনি? বাতাসে ভেসে আসা একটা সুর — সেটা তো কোনো অক্ষর না, কোনো pixel-ও না। সেটাকে কীভাবে bit বানাব?

---

// তথ্যের টুকরো যদি হয় sound

শব্দ মূলত একটা continuous pressure wave — বাতাসের একটা কাঁপুনি। Computer continuous কিছু বোঝে না। বোঝে কেবল discrete সংখ্যা।

তাহলে কীভাবে continuous জিনিসকে discrete করা যায়?

একটা analogy দিয়ে ভাবা যাক। ধরুন আপনি একটা দৌড়ের video করছেন। যদি প্রতি এক সেকেন্ডে একটাই ছবি তোলেন, video-টা খুব খাপছাড়া লাগবে — এক মুহূর্তে দৌড়বিদ এক জায়গায়, পরের মুহূর্তে হঠাৎ অনেক দূরে। কিন্তু প্রতি সেকেন্ডে যদি ৬০টা করে ছবি তোলেন, হঠাৎ করে সেটা smooth চলমান video-তে পরিণত হবে।

শব্দের ক্ষেত্রেও ঠিক তাই। পুরো wave-টা হুবহু ধরে রাখা হয় না। বরং খুব দ্রুত, খুব অনেকগুলো "ছবি" তুলে রাখা হয়। প্রতিটা "ছবি" মানে — ঠিক এই মুহূর্তে wave-টার উচ্চতা (amplitude) কতটুকু।

এই প্রক্রিয়ার নাম [HOVER: sampling]।

[FIGURE 2: A continuous sound wave graph with vertical bars at regular intervals measuring the height (amplitude) of the wave at each point. Mark the measurement points (samples) and show how each height is converted into a binary number. Caption: "Sound wave sampling → binary numbers।"]

একটা audio কতটা নিখুঁত হবে, সেটা নির্ভর করে দুটি জিনিসের ওপর:

**Sample Rate:** প্রতি সেকেন্ডে কতবার wave-এর উচ্চতা মাপা হচ্ছে। CD quality audio-র standard হলো 44,100 Hz — মানে প্রতি সেকেন্ডে ৪৪,১০০ বার measurement। এত বেশি কেন? কারণ মানুষের কান সর্বোচ্চ প্রায় 20 kHz frequency-র শব্দ শুনতে পারে। আর একটা wave-কে ঠিকমতো reconstruct করতে হলে তার double rate-এ sample করতে হয়। ২০ × ২ = ৪০ kHz, একটু বাড়িয়ে 44.1 kHz-এ থামানো হয়েছে।

**Bit Depth:** প্রতিটা measurement store করতে কত bit ব্যবহার হবে? সাধারণত ১৬ বা ২৪ bit। যত বেশি bit, তত বেশি precise — শব্দের সূক্ষ্ম detail তত ভালোভাবে ধরা পড়ে।

তারমানে, তথ্যের টুকরো এখন আর অক্ষর, pixel বা sound না। সব রূপে সে এখন সংখ্যা। আর সংখ্যা মানেই bit। একটা বিশাল রহস্য উন্মোচিত হলো।

কিন্তু এখানে একটা সমস্যা আছে।

---

// সমস্যা — সব কিছুই বিশাল

যদি text, image, sound-এর প্রতিটা কণা এভাবে হুবহু memory-তে লিখে রাখা হয়, তাহলে file size হবে ভয়াবহ:

- একটা 3-minute গান → প্রায় 30 MB (raw)
- একটা HD ছবি → প্রায় 6-10 MB (raw)
- একটা 1-hour 4K video → প্রায় 100+ GB (raw)

এত বড় file-এর ভার internet সহ্য করতে পারবে না। Instagram-এ ছবি upload করতে ঘণ্টা লেগে যাবে। YouTube video load-ই হবে না।

সমাধান হলো **compression**। ছোট করে ফেলা।

আর এই magic-টা আসলে দুই ধরনের।

---

// Compression: চতুরভাবে ছোট করা

[HOVER: lossless compression] হচ্ছে সেই ধরনের compression যেখানে কিছুই হারায় না। File compress করলাম, পরে decompress করলাম — হুবহু original ফিরে পেলাম, একটাও bit বদলালো না।

এটা কীভাবে সম্ভব? আসল ট্রিকটা হলো — data-র মধ্যে থাকা repetition বা pattern খুঁজে বের করা।

একটা সহজ example। কেউ যদি জিজ্ঞেস করে, নিচের জিনিসটা লেখার সহজ উপায় কী?

```
AAAAAAAAAAAAAAAAAA
```

আপনি হয়তো বলবেন — "18 × A"।

দুটোই একই কথা প্রকাশ করে, কিন্তু দ্বিতীয়টা অনেক ছোট। এটাই **Run-Length Encoding (RLE)**-এর মূল আইডিয়া। পর পর একই জিনিস থাকলে সেটা বারবার না লিখে জাস্ট "কতবার" আর "কী" লিখে দেওয়া। যদি কোনো ছবিতে পর পর ৫০টা সাদা pixel থাকে, RLE লিখবে `50 × White` — ৫০টা আলাদা pixel value store করার বদলে একটা জোড়া।

আরেকটা technique হলো **Huffman coding**। এটার idea-টা দারুণ। ধরুন আপনি আর আপনার বন্ধু প্রতিদিন 100 বার একটা phrase লেখেন — "ঠিক আছে"। এতবার লিখতে গিয়ে অনেক সময় খরচ হয়। যদি দুজন মিলে আগে থেকে ঠিক করে রাখেন, একটা ⭐ চিহ্ন মানে হবে "ঠিক আছে" — তাহলে একই তথ্য অনেক কম জায়গায় প্রকাশ করা যাবে।

Huffman-এর মূল আইডিয়া ঠিক এমনই। File-এ সবচেয়ে বেশিবার আসা data-কে সবচেয়ে ছোট code দাও। কম আসা data-কে বড় code। মোট size তখন দ্রুত কমে যায়।

*Huffman algorithm-এর গভীরে গেলে tree structure, priority queue — অনেক জিনিস আসবে। কিন্তু এখনের জন্য এই basic intuition-টাই যথেষ্ট।*

Developer হিসেবে যখন browser-এ HTML, CSS, JS পাঠান, সেখানে lossless compression (Gzip বা Brotli) mandatory। কারণ ওখানে একটা semicolon হারিয়ে গেলেই code ভেঙে পড়বে। lossless-এ কিছুই হারায় না, তাই এটা নিরাপদ।

[HOVER: lossy compression] অন্য জিনিস। এখানে ইচ্ছাকৃতভাবে কিছু data চিরতরে মুছে ফেলা হয় — কিন্তু এমনভাবে, যাতে মানুষের চোখ বা কান পার্থক্য ধরতে না পারে।

**Sound-এ:** MP3 format মানুষের শোনার সীমাবদ্ধতা কাজে লাগায়। যে frequency-গুলো মানুষ শুনতেই পায় না, সেগুলো বাদ দিয়ে দেওয়া হয়। একই মুহূর্তে যদি একটা জোরালো শব্দ চলে, তার পাশে একটা হালকা শব্দ থাকলে — মানুষের কান হালকা শব্দটা ধরতে পারে না, তাই সেটাও বাদ।

**Image-এ:** JPEG format মানুষের চোখের বৈশিষ্ট্যকে কাজে লাগায়। আমাদের চোখ রঙের চেয়ে আলোর তারতম্য বেশি ভালোভাবে ধরে। তাই ছবির রঙের তথ্য একটু কমিয়ে দিলে চোখ ধরতে পারে না, কিন্তু file অনেক ছোট হয়ে যায়।

**Video-তে:** এক frame থেকে পরের frame-এ যে অংশগুলো পরিবর্তন হচ্ছে না (যেমন background), সেগুলো নতুন করে store না করে আগের frame থেকে reference নেওয়া হয়। একটা এক-ঘণ্টার video-তে বেশিরভাগ frame-ই আসলে আগের frame-এর সামান্য variation। H.264, H.265, AV1 — এই সব encoding format এই আইডিয়াটাকেই কাজে লাগায়।

সহজ rule of thumb — media (image, audio, video)-এর জন্য lossy compression যথেষ্ট। কিন্তু code, text, database backup-এর জন্য lossless ছাড়া উপায় নেই।

---

// CPU কিন্তু কিছুই বোঝে না

এই জায়গায় একটা weird ব্যাপার আছে।

তথ্যের সেই টুকরোটা যখন memory-তে voltage হিসেবে বসে আছে, CPU-র কাছে সেটা কী? একটা অক্ষর? একটা pixel? একটা sound sample?

আসলে কিছুই না।

CPU-র কাছে `01000001` মানে কেবল আটটা voltage-এর একটা pattern। এটা "A" না। এটা "65" সংখ্যাও না। এটা কোনো "লাল shade"-ও না। এটা শুধু voltage।

CPU কখনো ভাবে না — "আরে! এটা তো একটা বিড়ালের ছবি!" কিংবা "এটা তো বাংলা language!"

সে শুধু instruction follow করে যায়। ঠিকঠাক voltage সরায়।

তাহলে অর্থটা তৈরি হয় কোথায়? সফটওয়্যারে। যে application এই bit sequence খুলছে, সে-ই ঠিক করে দেয় এটা কী রূপে দেখানো হবে:

- Text editor `01000001` কে পড়ে screen-এ বড় হাতের 'A' দেখাবে
- Calculator একই bit sequence-কে দেখবে সংখ্যা 65 হিসেবে
- Image viewer এটাকে interpret করতে পারে একটা navy-blue pixel-এর অংশ হিসেবে

Same bit, ভিন্ন meaning। Software gives meaning। CPU is blind।

---

// পুরো গল্পটা একবার

এবার সেই তথ্যের টুকরোর পুরো যাত্রা একবার চোখের সামনে চালিয়ে দেখা যাক।

আপনি লিখলেন:

```jsx
const message = "Hello";
```

- প্রথমে প্রতিটা অক্ষর একটা করে Unicode code point পেল
- UTF-8 সেই code point-গুলোকে bit-এ রূপান্তর করে দিল
- যদি network-এ পাঠানো হয়, Gzip এসে সেই bit-গুলোকে আরও ছোট করে দিল
- Memory controller সেই bit-গুলোকে RAM-এর flip-flop-এ voltage হিসেবে বসিয়ে দিল
- পরে CPU যখন এই ডেটা পড়তে চাইল, সেই voltage read করে ফেরত আনল
- আপনার JavaScript engine সেই bit-গুলোকে interpret করে আবার সেই আগের "Hello" শব্দটাই ফিরিয়ে দিল

পুরো process-এ same information বার বার রূপ বদলেছে। বাতাসের কম্পন থেকে সংখ্যা। সংখ্যা থেকে bit। বিট থেকে voltage। আবার voltage থেকে সংখ্যা, সংখ্যা থেকে অক্ষর।

Meaning একই থেকেছে। শুধু রূপ পাল্টেছে।

সমস্ত computing-এর গল্পটা মূলত এটাই — একই তথ্যের একের পর এক translation, কিন্তু meaning একই থাকা।

---

// এই আর্টিকেলে কী শিখলাম

- **কম্পিউটার কোনো ছবি "দেখে" না, কোনো গান "শোনে" না** — সব তথ্যই শেষ পর্যন্ত bit-এর একটা sequence।
- **বাস্তব জগতকে digital করার আলাদা আলাদা dictionary আছে** — text-এর জন্য Unicode + UTF-8, image-এর জন্য RGB pixel grid, sound-এর জন্য sampling।
- **Compression দুই ধরনের** — lossless (কিছুই হারায় না, code/text-এর জন্য mandatory) আর lossy (মানুষের ইন্দ্রিয়ের সীমাবদ্ধতা কাজে লাগায়, media-র জন্য standard)।
- **Meaning-টা software-এ, bit-এ না** — একই bit sequence context ভেদে অক্ষর, সংখ্যা বা pixel হতে পারে।

---

// পরের article-এ

তথ্যের সেই টুকরোটা এখন memory-তে voltage হিসেবে সুন্দর বসে আছে। কিন্তু সে নিজে থেকে কিছুই করতে পারে না। কেউ একজনকে এসে তাকে ব্যবহার করতে হবে — যোগ করতে হবে, সরাতে হবে, তুলনা করতে হবে।

কে সেই কেউ?

Processor-এর ভেতরে ঠিক কী কী থাকে? কে হিসাব করে, কে মনে রাখে, কে পুরো ব্যাপারটা orchestrate করে?

পরের আর্টিকেলে CPU-র ভেতর একবার ঢুকে দেখা যাবে।

**[পরের article: ৩. CPU-র blueprint]**

---

### Hover Definitions

**[HOVER: Two's Complement]***ডিজিটাল ইলেকট্রনিক্সে চিহ্নযুক্ত (পজিটিভ ও নেগেটিভ) পূর্ণসংখ্যা রিপ্রেজেন্ট করার সবচেয়ে জনপ্রিয় গাণিতিক পদ্ধতি। এতে কোনো সংখ্যার বিটগুলোকে ইনভার্ট করে ১ যোগ করে নেগেটিভ মান বের করা হয়। এর সবচেয়ে বড় সুবিধা হলো, এর ফলে সিস্টেমে কেবল একটিই শূন্য (0) থাকে এবং প্রসেসর একই হার্ডওয়্যার সার্কিট ব্যবহার করে যোগ ও বিয়োগ সম্পন্ন করতে পারে।*

**[HOVER: ASCII]***ASCII (American Standard Code for Information Interchange) — computing-এর সবচেয়ে পুরনো character encoding standard। প্রতিটা ইংরেজি অক্ষর, digit, punctuation-এর জন্য একটা করে ৭-bit code (মোট ১২৮টা possibility)। ১৯৬০-এর দশকে design করা হয়েছিল, তখন শুধু ইংরেজির জন্য বানানো ছিল। এখনো UTF-8-এর ভেতরে backward compatibility হিসেবে টিকে আছে।*

**[HOVER: Unicode]***Unicode একটা international standard যেটা পৃথিবীর প্রতিটা language-এর প্রতিটা character-এর জন্য একটা করে unique identity বা code point নির্ধারণ করে — যেমন 'ক'-এর code point হলো U+0995। মনে রাখবেন, এটা identity assignment, encoding না। কীভাবে সেই identity actual bit-এ রূপান্তর হবে, সেটা encoding-এর কাজ (যেমন UTF-8 বা UTF-16)।*

**[HOVER: UTF-8]***UTF-8 হলো Unicode-এর সবচেয়ে জনপ্রিয় encoding। এটা variable-width — সহজ character-এর জন্য কম bit, জটিলের জন্য বেশি। ইংরেজি অক্ষরের জন্য ১ byte, বাংলা character-এর জন্য ৩ byte, complex emoji-র জন্য ৪ byte পর্যন্ত। ASCII-র সাথে সম্পূর্ণ backward compatible — যেকোনো valid ASCII file automatically একটা valid UTF-8 file।*

*[HOVER: Endianness]যখন কোনো ডেটা ১ byte-এর চেয়ে বড় হয় (যেমন ৩ byte-এর বাংলা অক্ষর বা ৩২-bit integer), তখন সেই মাল্টি-byte ডেটা মেমরিতে কোন ক্রমানুসারে (byte order) সংরক্ষিত হবে, তা নির্ধারণ করার পদ্ধতি।*

- *Big-Endian: সবচেয়ে গুরুত্বপূর্ণ byte (Most Significant Byte - MSB) মেমরির প্রথম এড্রেসে বসে (স্বাভাবিক মানুষের পড়ার মতো)।*
- *Little-Endian: সবচেয়ে কম গুরুত্বপূর্ণ byte (Least Significant Byte - LSB) আগে বসে। আধুনিক x86 এবং ARM প্রসেসরগুলো সাধারণত Little-Endian ব্যবহার করে।*

**[HOVER: sampling]***Sampling হলো continuous জিনিস (যেমন sound wave, temperature reading) থেকে regular interval-এ measurement নিয়ে সেটাকে discrete সংখ্যায় রূপান্তরের process। যেমন একটা video camera প্রতি সেকেন্ডে অনেকগুলো ছবি তুলে সেগুলোকে জোড়া দিয়ে চলমান video বানায় — sampling ঠিক তেমনই একটা wave থেকে অনেকগুলো "snapshot" নিয়ে সেটাকে digital data-য় রূপ দেয়।*

**[HOVER: lossless compression]***Lossless compression মানে data-কে ছোট করা, কিন্তু কিছুই না হারিয়ে। Compress করার পর যেকোনো সময় সম্পূর্ণ original ফিরে পাওয়া যায়। ট্রিকটা হলো — repetition আর pattern খুঁজে বের করে সেগুলোকে সংক্ষেপে লেখা। Gzip, Brotli, PNG — এসব lossless। Text, code, database backup-এর জন্য mandatory।*

**[HOVER: lossy compression]***Lossy compression মানে সাইজ কমানোর জন্য কিছু data চিরতরে বাদ দেওয়া — কিন্তু এমনভাবে যাতে মানুষের চোখ বা কান পার্থক্য ধরতে না পারে। MP3, JPEG, H.264 — এগুলো সব lossy। মানুষের perception-এর সীমাবদ্ধতা কাজে লাগিয়ে অসাধারণ compression ratio পাওয়া যায়। কিন্তু original data চিরতরে হারিয়ে যায় — decompress করলে exactly একই file আর ফিরে পাওয়া যায় না।*

# How does the world become zeros and ones?

## The translator inside text, image, and sound

Suppose I write "Hello" on a piece of paper and hand it to you. You'll see five letters, a word. Show you a picture of a cat, you'll see an animal. Play an MP3, you'll hear a song.

But the computer sees none of that. To it, the word "Hello", the cat picture, and your favorite song — they're all the same thing. Just 0s and 1s.

How? That's what this article is about.

---

## One thing to clear up first

In the last article we saw what a bit physically is — a state of voltage, trapped in a flip-flop.

Today the question flips. A character in the real world, a color, a sound — how do they become 0s and 1s before landing in memory? That translation is the story for today.

The protagonist of this series is still information. Text, image, sound — this article follows that piece of information all the way to memory. CPU, OS — those are for later.

---

## First rule: everything becomes a number first

One thing to keep in mind. The computer knows one trick — move voltage around. High or low. 1 or 0.

And what voltage combinations can express is only numbers. Nothing else.

Everything else is built on top of this rule. Want text? First convert text into numbers. Want images? First convert those into numbers. Sound? Same story.

Then the numbers break into binary, and binary lands in memory as voltage.

So the first question — how do numbers themselves become binary?

---

## From number to binary

Humans use base-10, or the decimal system. Why? The reason is probably simple — we have 10 fingers. Ten digits (0 through 9), and each column's value grows as a power of 10 — ones, tens, hundreds, thousands.

A computer's switches or transistors only understand two states — on or off. So it uses base-2, or binary. Only two digits (0 and 1), and each column's value grows as a power of 2 — 1, 2, 4, 8, 16, 32, and so on.

Why powers of 2 specifically? The reason's fun. Every new bit actually doubles the possibilities. One bit gives you two possible states (0 or 1). Add a second bit and you get four possibilities (00, 01, 10, 11). Three bits give eight. Four give sixteen. The possibilities grow exponentially.

So, how do we actually build numbers using these binary columns? The rule is simple: **turn "ON" (`1`) the columns whose values you need to add up, and leave the rest "OFF" (`0`).**

[Animation 1: Increasing bit exponentially increasing possibility and conversion of decimal 13 to binary 1101, how power of 2 is being used here]

As an example, let's take the decimal number 13. Our columns are 8, 4, 2, and 1. To make 13, we need one 8, one 4, and one 1 (since $8 + 4 + 1 = 13$). We don't need the 2. Therefore, its binary representation is `1101`.
Mathematically, the calculation looks like this:

$$1101_2 = (1 \times 8) + (1 \times 4) + (0 \times 2) + (1 \times 1) = 13_{10}$$

Positive numbers make sense, but how does a computer actually store a minus ($-$) sign in memory? Hardware doesn't understand plus or minus; it only understands voltage.

At first glance, you might think we can just reserve the leftmost bit (the Most Significant Bit) to represent the sign—`0` for positive, `1` for negative. This approach is called **Sign-Magnitude**. But there is a glaring flaw—a bitter truth—with this simple logic. It creates two distinct binary representations for zero: a `+0` and a `-0` (for example, `00000000` and `10000000` in an 8-bit system). In mathematics, zero has no sign, and having two different zeros at the hardware level unnecessarily complicates the logic circuits required for basic arithmetic.

The most elegant and hardware-friendly solution to this problem is **[HOVER: Two's Complement]**.

The trick to finding a negative number here is straightforward: first, invert all the bits of its positive counterpart (flip `0` to `1` and `1` to `0`, known as One's Complement), and then simply add `1` to the result. By doing this, the computer can handle both addition and subtraction seamlessly using the exact same ALU (Arithmetic Logic Unit) circuitry, without needing any extra hardware logic to process signs.

Fine — numbers are handled. But in real life, you don't just write numbers. When you type "Hello" in a chat box, how do those letters become binary?

---

## If our piece of information is text

The trick for turning text into binary is simple — assign every character a specific number.

The earliest standard for this was [HOVER: ASCII]. Every English letter, digit, punctuation mark — each got a 7-bit code:

- Capital `A` → decimal 65 → binary `01000001`
- Small `a` → decimal 97 → binary `01100001`

ASCII worked fine for English. The problem started when other languages or emoji needed to exist. 7 bits gives you at most 128 possible characters. Not even enough for the Bangla alphabet alone, let alone the thousands of languages in the world.

Early on, when I tried taking Bangla input into a database using Python or C, I'd often see weird garbage on the screen — `åŠ©æ‰‹` or `\xE0\xB6...`. Nothing worked. I typed Bangla; the screen showed nonsense.

Later I understood — the computer was actually trying to decode my Bangla characters using the wrong dictionary. ASCII's dictionary doesn't have Bangla. It never did.

The solution is [HOVER: Unicode] — an international standard that assigns a unique **code point** to every character in every language.

There's a subtle distinction here that most people miss, because Unicode and UTF-8 are often used interchangeably. But they aren't the same thing.

**Unicode says what each character's identity is.**

**How that identity gets written in actual bits in memory — that's UTF-8's job.**

Unicode is a mapping — the rule for handing out identities. UTF-8 is an encoding — the rule for turning that identity into actual bits.

[HOVER: UTF-8] is a variable-width encoding. It uses 8 bits (1 byte) for English characters — perfectly ASCII-backward-compatible. But for a Bangla character or a complex emoji (🍕), it grows on its own, up to 32 bits (4 bytes) as needed.

Because a single character can now span multiple bytes, the hardware also needs to determine the exact byte order ([HOVER: Endianness]) in which they are arranged in memory.

[ANIMATION 1: A single Bangla character 'ক' at the top. Arrow down. Label: "Unicode assigns identity → U+0995". Arrow down. Label: "UTF-8 encodes into bits". Arrow down. Show the final binary with highlighted byte-markers: **1110**0000 **10**100110 **10**010101. (Highlight the '1110' and '10' bits in a distinct color to show how UTF-8 flags a 3-byte character). Caption: "One character becoming bits — two layers (identity & encoding) and structural multi-byte markers."]

That's the text story. If our piece of information was a character, it's now binary, ready to land in memory.

But what if it's part of an image?

---

## If our piece of information is an image

Zoom in on any digital picture and you'll see it's actually millions of tiny dots. Each dot is called a **pixel**.

To produce color on a screen, we use the RGB model. Every pixel is a mix of three primary colors — **Red**, **Green**, **Blue**.

Each color has a brightness value from 0 to 255. 255 means full brightness, 0 means completely off. Storing values up to 255 takes 8 bits (1 byte) per color channel.

So one pixel's color takes: 8 + 8 + 8 = 24 bits total. That's what we call **24-bit color depth**:

- A pure red pixel: `255, 0, 0` → `11111111 00000000 00000000`
- A purple pixel: `128, 0, 128` → `10000000 00000000 10000000`

[FIGURE 1: A grid of 4x4 pixels zoomed in, each pixel showing its RGB value (e.g., Red, Purple, Black, White) and how the computer sees it as a continuous stream of 24-bit binary packages. Caption: "Pixel grid to binary stream."]

The computer arranges these pixel values row by row and writes the whole image to memory as a sequence of bits.

Here's a number worth thinking about. If your screen runs at 1920×1080, that's about 2 million pixels holding distinct colors at any moment. 24 bits each. Six megabytes just to render one frame. But in reality, an image or a frame of a video doesn’t take this much space. How? More on that later.

Image handled. But what about what we hear? A tune floating through air isn't a character, isn't a pixel either. How does that become bits?

---

## If our piece of information is sound

Sound is a continuous pressure wave — the air shaking. Computers understand nothing continuous. They understand discrete numbers.

So how do you turn something continuous into something discrete?

Think about it this way. You're recording a video of someone running. Take one picture per second and the video looks jerky — one moment the runner is here, the next they're way over there. But take 60 pictures per second, and suddenly it turns into a smooth continuous video.

Sound works the same way. The wave itself isn't held onto in full. Instead, snapshots get taken, very fast and very often. Each snapshot means — at this exact moment, what's the wave's height (amplitude)?

The name for this process is [HOVER: sampling].

[FIGURE 2: A continuous sound wave graph with vertical bars at regular intervals measuring the height (amplitude) of the wave at each point. Mark the measurement points (samples) and show how each height is converted into a binary number. Caption: "Sound wave sampling → binary numbers."]

Audio quality depends on two things:

**Sample Rate:** How many times per second the wave's height is measured. The standard for CD-quality audio is 44,100 Hz — 44,100 measurements per second. Why so many? Because the human ear can hear up to about 20 kHz, and to reconstruct a wave properly, you need to sample it at double its highest frequency. 20 × 2 = 40 kHz, rounded up slightly to 44.1 kHz.

**Bit Depth:** How many bits are used to store each measurement — usually 16 or 24. More bits, more precision — subtle details of the sound get captured more faithfully.

Our piece of information is no longer a character, a pixel, or a sound. In every form, it's now a number. And a number is bits. We have unveiled a large mystery.

But there's a problem.

---

## The problem — everything is huge

If we stored text, image, and sound faithfully in memory, file sizes would be terrifying:

- A 3-minute song → about 30 MB raw
- An HD image → 6-10 MB raw
- A 1-hour 4K video → 100+ GB raw

The internet couldn't carry this weight. Instagram uploads would take hours. YouTube videos wouldn't load.

The solution is **compression**. Make it small.

And the magic comes in two flavors.

---

## Compression: clever shrinking

[HOVER: lossless compression] is the kind that loses nothing. Compress a file, decompress it later, you get the exact original back — not a single bit changed.

How is that possible? The real trick is finding repetition or patterns in the data.

Quick example. If someone asked you the simplest way to write this:

```
AAAAAAAAAAAAAAAAAA
```

You'd probably say — "18 × A."

Both express the same thing, but the second is much smaller. That's the core idea of **Run-Length Encoding (RLE)**. If the same thing repeats, don't write it out; just write "how many" and "what." A picture with 50 white pixels in a row? RLE writes `50 × White` instead of storing 50 separate pixel values.

Another technique — **Huffman coding**. The idea is elegant. Suppose you and your friend text a phrase 100 times a day — "yeah, okay." Typing it that many times wastes a lot of effort. If the two of you agree in advance that one ⭐ means "yeah, okay" — you can express the same information in a lot less space.

Huffman's core idea is exactly that. Look at the file. Give the most frequently occurring data the shortest code. Give rare data longer codes. Total size shrinks fast.

*The full Huffman algorithm gets into trees and priority queues — but for today's story, this basic intuition is enough.*

As a developer, when you send HTML, CSS, or JS to a browser, lossless compression (Gzip or Brotli) is mandatory. Lose a single semicolon and the code breaks. Lossless loses nothing, so it's safe.

[HOVER: lossy compression] is a different beast. Here we deliberately throw away some data — but in ways that human eyes and ears can't catch.

**Sound:** MP3 exploits the limits of hearing. Frequencies humans can't hear anyway? Gone. If a quiet sound plays at the same time as a loud one, the ear can't catch the quiet part — so it goes too.

**Image:** JPEG uses the eye's characteristics. Our eyes catch brightness differences better than color differences. So JPEG reduces color detail a bit, and the eye doesn't notice, but files get dramatically smaller.

**Video:** Most background pixels don't change from one frame to the next. Instead of re-storing them, encoders reference the previous frame. An hour-long video is mostly small variations on the previous frame. H.264, H.265, AV1 — all these encoders exploit this idea.

Simple rule of thumb — media (image, audio, video) → lossy is fine. Code, text, databases → lossless is mandatory.

---

## The CPU understands none of this

Here's the weird part.

When our piece of information sits in memory as voltage, what is it to the CPU? A character? A pixel? A sound sample?

Actually — nothing.

To the CPU, `01000001` is just eight voltage patterns. Not "A". Not the number "65". Not "a shade of red". Just voltage.

The CPU never thinks — "oh look, it's a cat picture!" or "oh, that's Bangla!"

It just follows instructions. Moves voltage properly.

So where does meaning come from? Software. Whatever application is reading these bits decides how they get shown:

- A text editor reads `01000001` and shows an "A" on screen
- A calculator reads the same bits as the number 65
- An image viewer might interpret it as part of a navy-blue pixel

Same bits, different meanings. Software gives meaning. The CPU is blind.

---

## The whole story at once

Let's play back the journey of our piece of information from start to finish.

You wrote:

```jsx
const message = "Hello";
```

- First each character got a Unicode code point
- UTF-8 turned those code points into bits
- If it was sent over the network, Gzip came in and shrunk the bits further
- The memory controller pushed those bits into RAM's flip-flops as voltage
- Later, when the CPU wanted to read this data, it read the voltage back
- Your JavaScript engine interpreted those bits and gave you back the original "Hello"

Through the whole process, the same information kept changing form. Air vibrations to numbers. Numbers to bits. Bits to voltage. Voltage back to numbers, numbers back to characters.

Meaning stayed the same. Only the form changed.

The whole story of computing is basically this — the same information being translated, over and over, without losing what it means.

---

## What this article covered

- **The computer doesn't "see" any image or "hear" any song** — every piece of information ends up as a sequence of bits.
- **Each type of real-world thing has its own digitization dictionary** — Unicode + UTF-8 for text, RGB pixel grids for images, sampling for sound.
- **Compression comes in two flavors** — lossless (loses nothing, mandatory for code and text) and lossy (exploits the limits of human perception, standard for media).
- **Meaning lives in software, not in the bits** — the same bit sequence is a character, a number, or a pixel depending on the context that reads it.

---

## Next article

Our piece of information sits comfortably in memory as voltage. But it can't do anything on its own. Someone has to come and use it — add it, move it, compare it.

Who's that someone?

What exactly lives inside a processor? Who does the math, who remembers, who orchestrates everything?

Next article, we finally step inside the CPU.

**[Next: 3. The CPU's blueprint]**

---

### Hover Definitions

**[HOVER: Two's Complement]***The mathematical operations standard used in digital electronics to represent signed (both positive and negative) integers. It is achieved by inverting the bits of a binary number and adding 1. Its primary advantage is that it eliminates the problem of a negative zero (-0) and allows the CPU to perform both addition and subtraction using the exact same hardware circuitry.*

**[HOVER: ASCII]***ASCII (American Standard Code for Information Interchange) is computing's oldest character encoding standard. A 7-bit code for every English letter, digit, and punctuation mark (128 possibilities total). Designed in the 1960s, made only for English at the time. Still lives inside UTF-8 today for backward compatibility.*

**[HOVER: Unicode]***Unicode is an international standard that assigns a unique identity (code point) to every character in every language on Earth — like U+0995 for 'ক'. Remember, this is identity assignment, not encoding. How that identity turns into actual bits is the job of encoding schemes like UTF-8 or UTF-16.*

**[HOVER: UTF-8]***UTF-8 is the most popular Unicode encoding. Variable-width — fewer bits for simple characters, more for complex ones. 1 byte for English letters, 3 bytes for Bangla characters, up to 4 bytes for complex emoji. Fully backward-compatible with ASCII — any valid ASCII file is automatically a valid UTF-8 file.*

***[HOVER: Endianness]**The system configuration that dictates the byte order used to store multi-byte data (like a 3-byte Bangla character or a 32-bit integer) in computer memory.*

- ***Big-Endian:** Stores the most significant byte (MSB) at the lowest memory address (how humans naturally read numbers).*
- ***Little-Endian:** Stores the least significant byte (LSB) first. Modern x86 and ARM architecture CPUs predominantly use Little-Endian.*

**[HOVER: sampling]***Sampling is the process of turning something continuous (like a sound wave or a temperature reading) into discrete numbers by taking measurements at regular intervals. Like a video camera taking many still pictures per second and stringing them together as a moving video — sampling takes many "snapshots" of a wave to turn it into digital data.*

**[HOVER: lossless compression]***Lossless compression shrinks data without losing anything. Decompress at any time and you get the exact original back. The trick is finding repetition and patterns in the data and writing them more concisely. Gzip, Brotli, PNG — all lossless. Mandatory for text, code, database backups.*

**[HOVER: lossy compression]***Lossy compression shrinks by permanently discarding some data — but in ways human eyes and ears can't detect. MP3, JPEG, H.264 — all lossy. Exploiting the limits of human perception gets you incredible compression ratios. But the original data is gone forever — decompressing doesn't give you back an exact copy.*
