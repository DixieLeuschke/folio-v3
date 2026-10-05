# Audyt UI/UX i estetyki — folio-v3

Data oględzin: 5 października 2026.  
Przeglądarka: Google Chrome 148.0.7778.96, headless.  
Adres z briefu: `https://dixieleuschke.github.io/folio-v3/`.

## Metoda

Oceniałem wyrenderowaną stronę, nie sam opis. Chrome przeszedł pełny łańcuch przekierowań i załadował dokument. Zrzuty i pomiary są w [`dowody/`](dowody/).

Widoki: 360, 390, 768, 896, 940, 1000, 1024, 1100, 1200, 1280 i 1440 px szerokości. Osobno: menu mobilne, hover karty, focus klawiatury, pusty formularz, trzy case studies, strona 404 i korzeń domeny.

Kontrast liczyłem z tokenów oraz z pikseli tła pod tekstem hero (po ukryciu warstwy tekstu). Dostępność: axe-core, tagi WCAG 2.0/2.1/2.2 A i AA oraz best-practice. Wydajność: jedno laboratoryjne przejście z wyłączonym cache, opóźnieniem 150 ms i przepustowością 1,6 Mb/s. To wynik tego środowiska, nie dane CrUX.

Deploy na żywo ma `Last-Modified: Sat, 26 Sep 2026 07:06:35 GMT` i pokrywa się z commitem `c0c2486` w tym repozytorium. Cytaty z interfejsu pochodzą z wyrenderowanego DOM.

Założenia, które nie wynikają wprost z ekranu, są oznaczone jako **Założenie**.

## 1. Ocena ogólna

To jest schludny, ciemny szablon portfolio z poprawnym systemem tokenów i kilkoma realnymi prototypami w środku. Na pulpicie da się go przeczytać. Na telefonie układ się rozjeżdża: karty prac wymuszają szerokość 646 px, a otwarte menu pokazuje przycisk „Zamknij” i ucięty pasek, podczas gdy linki sekcji zostają poza kadrem. Wizerunek rozdziela się na trzy nazwy (John Pavulon, john@pavulon.dev, Dixie Leuschke), a właściwa strona kończy na `http://`. Case studies są uczciwe co do statusu makiet, ale brzmią jak wypełniona specyfikacja, nie jak argument dla klienta albo rekrutera.

| Obszar | Wynik |
| --- | --- |
| Estetyka | 6 / 10 |
| UX | 5 / 10 |
| Spójność | 7 / 10 |
| Dostępność | 7 / 10 |
| Responsywność | 3 / 10 |
| Skuteczność portfolio | 4 / 10 |

## 2. Najmocniejsze elementy

1. **System wizualny jest jeden.** Tło `#111214` / `#22242C`, tekst `#EDEAE3`, mosiądz `#C9A876`, focus 2 px w tym samym kolorze. Sekcje, przyciski i badge nie rozjeżdżają się stylistycznie między stroną główną a case study.
2. **Status prac jest uczciwy.** FinLux ma plakietkę „Projekt koncepcyjny”, BarthMoney i Graff — „Wersja demonstracyjna”. Tekst case study wprost mówi, że kwoty są przykładowe i że nie ma pomiaru wdrożenia.
3. **Formularz briefu ma sensowny wzorzec błędu.** Pusty submit daje podsumowanie „Uzupełnij formularz, zanim go wyślesz.” z linkami: „Podaj imię.”, „Podaj poprawny e-mail.”, „Wybierz typ projektu.”, „Opisz projekt w co najmniej jednym zdaniu.” Pola dostają `aria-invalid`.
4. **Klawiatura i ruch są zaprojektowane.** Pierwszy Tab ląduje na „Przejdź do treści”. Focus to `rgb(201, 168, 118) solid 2px`. `prefers-reduced-motion` wyłącza parallaksę hero i przejścia kart. Menu ma pułapkę Tab i Escape — geometria tego menu na telefonie jest osobnym problemem, opisana niżej.
5. **W case study widać działający interfejs, nie tylko opis.** Graff ma interaktywny kalendarz zmian. BarthMoney pokazuje cztery klatki (pulpit, czat, szybkie dodanie, pusty stan) w jednym podglądzie.

## 3. Najważniejsze problemy

| Element | Problem | Wpływ | Rekomendacja | Priorytet | Nakład |
| --- | --- | --- | --- | --- | --- |
| Karty w `#prace`, &lt; 56 rem | `.project-card__media` łączy `min-height: 22rem` (wyróżnione) albo `18rem` z `aspect-ratio: 16/9`. Przy szerokości telefonu przeglądarka rozpycha ramkę do 626×352 px. `scrollWidth` strony przy viewporcie 390 i 360 px wynosi **646 px**. | Poziomy scroll na całej stronie głównej. WCAG 1.4.10 (Reflow) nie jest spełniony. Miniatury wychodzą poza ekran. | Zostaw `width: 100%` i `aspect-ratio`, usuń `min-height` albo ogranicz je do `min(22rem, 56vw)`. Dodaj `min-width: 0` na karcie i `overflow-x: clip` na `body` jako siatkę bezpieczeństwa. | Krytyczny | Mały |
| Menu mobilne | `.nav-panel.is-open` ma `position: fixed; inset: 0`, ale zawierający blok urósł do layout viewportu **646×1399**. `window.innerWidth` w emulacji 390 px wynosi 646. „Zamknij” ma `x = 544` i nie mieści się w kadrze 390 px. Zrzut viewportu pokazuje tylko „Zamknij” i krawędź mosiężnego paska. Pełne menu (Prace, Usługi, Proces, O mnie, Kontakt, CTA) widać dopiero na zrzucie całego panelu, szerokiego na 646 px. | Na telefonie nawigacja jest niedostępna. Użytkownik nie przechodzi do prac, usług ani kontaktu. | Najpierw usunąć overflow kart. Potem wymusić na panelu `width: 100vw; height: 100dvh; max-width: 100%; overflow: auto`. Fokus otwarcia zostawić na pierwszym linku wewnątrz kadru. | Krytyczny | Mały |
| Domena i HTTPS | `https://dixieleuschke.github.io/folio-v3/` zwraca **301** na `http://johnpavulon.me/folio-v3/`. Chrome podbija to do HTTPS, dostaje certyfikat `CN=*.github.io` (SAN nie obejmuje `johnpavulon.me`) i wraca **307** na HTTP **200**. Końcowy adres to `http://johnpavulon.me/folio-v3/`. | Pasek „Niezabezpieczona”. Brief z imieniem, e-mailem i opisem projektu ląduje w linku `mailto:` na stronie bez TLS. | Włączyć HTTPS dla domeny własnej w GitHub Pages (certyfikat musi pokrywać `johnpavulon.me`) i serwować jedno kanoniczne `https://`. | Krytyczny | Mały |
| Korzeń `johnpavulon.me` | `http://johnpavulon.me/` to domyślny motyw Jekyll. Tytuł: „DixieLeuschke.github.io \| Dixie Leuschke”. `<html lang="en-US">`. Canonical: `http://johnpavulon.me/`. H1: „Dixie Leuschke”. Portfolio jest pod `/folio-v3/` i podpisane „John Pavulon”, e-mail `john@pavulon.dev`. | Rekruter, który skróci URL albo otworzy domenę, widzi inną osobę i inny język niż portfolio. **Założenie:** nie wiem, czy to ta sama osoba; raportuję tylko publiczną rozbieżność. | Albo przekierować korzeń na portfolio i ujednolicić nazwę, albo zdjąć custom domain z konta, które serwuje szablon Jekyll. Jedna nazwa w title, H1, mailu i GitHubie. | Krytyczny | Mały |
| Hero | H1: „Projektuję interfejsy od przepływu po działający front-end.” Lead powtarza to samo zdaniem o „każdym ekranie”. Kolumna Co / Jak / Dalej powtarza to trzeci raz. Tło to cudzy pulpit fintech, przykryty gradientem od 0,94 do 0,55 krycia. Na 390 px zdjęcie jest praktycznie zasłonięte. | Pierwszy ekran nie pokazuje pracy autora. Obietnica „działającego front-endu” stoi obok plakietek „projekt koncepcyjny”. | Hero = jedna teza + jeden prawdziwy ekran (BarthMoney albo FinLux) na całą prawą kolumnę, bez stocku. Fakty zastąpić jednym zdaniem: dla kogo, jaki zakres, jak się zaczyna współpraca. | Wysoki | Średni |
| Karty prac, desktop | Sekcja `#prace` ma 2852 px z 6405 px strony (45%). Trzy projekty lecą jedną kolumną. Ramka 16:9 z `object-fit: contain` i `object-position: center bottom` zostawia szeroką ciemną matę wokół telefonu. Para Graff/suplementacja dzieli jedną ramkę na dwie wąskie kolumny; nagłówek miesiąca siedzi na krawędzi kadru. | Praca, która ma sprzedawać autora, jest najmniejszym obiektem w największej sekcji. | Siatka: wyróżnione 12 kolumn, obraz przycięty do urządzenia (`object-fit: cover` albo eksport bez marginesów). Graff jako dwa równe kadry telefonu, nie jeden billboard. | Wysoki | Średni |
| Case study | Kolejność: nagłówek, potem podgląd w udawanej ramce przeglądarki (wysokość klatki 648 px przy 1440×900), potem osiem bloków Kontekst → Rola plus Narzędzia. Bezpośredni URL `/prace/finlux` renderuje treść, ale HTTP status to **404** (body to SPA z `404.html`). | Link wysłany rekruterowi jest formalnie stroną błędu. Opis czyta się jak protokół, a prototyp — najmocniejszy dowód — tonie pod chromem przeglądarki i ścianą akapitów. | Podgląd pełnoekranowy bez fałszywych kropek okna. Zostawić trzy bloki: problem, decyzja, rola. Resztę skrócić. Serwować case study statusem 200. | Wysoki | Średni |
| Kontakt | Główna akcja nazywa się na cztery sposoby: „Porozmawiajmy o projekcie”, „Opowiedz o projekcie”, „Opowiedz mi o swoim pomyśle”, „Przygotuj wiadomość”. Submit buduje `mailto:john@pavulon.dev` i ustawia `window.location.href`. | Na telefonie i w przeglądarce firmowej mailto często nic nie otwiera. Formularz wygląda jak wysyłka, a jest szkicem wiadomości. | Jedna nazwa akcji, np. „Wyślij brief”. Endpoint, który przyjmuje POST, plus mailto jako drugi wybór. Krótka informacja, czego autor nie bierze. | Wysoki | Mały |
| O mnie | Cała sekcja to H2 „Projektuję jasno i konkretnie.” i jeden akapit. Brak zdjęcia, miasta, lat praktyki, dostępności, wybranych narzędzi, linku do repo albo CV. Wysokość sekcji 410 px, z czego padding bandu to 88 px z każdej strony. | Nie ma kogo zatrudnić. Portfolio produktów bez autora wygląda jak anonimowy koncept. | Pół strony: zdjęcie albo wyraźny portret typograficzny, 80–120 słów faktów, stack, którego dowodzą case studies, dostępność (od kiedy / w jakim trybie). | Wysoki | Mały |
| Nawigacja 896–999 px | Próg desktopu to `56rem` (896 px). Przy 896 px „O mnie” ma pole **34×55** (dwa wiersze), CTA „Porozmawiajmy o projekcie” **193×58**. Przy 1000 px oba wracają do jednej linii (50×33 i 226×44). | Na małym laptopie i w oknie obok edytora pasek wygląda na zepsuty. | Obniżyć próg menu do miejsca, w którym CTA mieści się w jednej linii (ok. 1000 px), albo skrócić CTA w pasku do „Brief”. `flex-wrap` i `white-space: nowrap` na etykietach. | Średni | Mały |
| Typografia drobna | Body na 1440 px: **15,18 px**. Badge / kicker: **11,95 px**, `line-height: 1`, tracking 0,08 em, JetBrains Mono, wersaliki. Lead i mute: 18 px / `#9A9A9F`. Stopka: linki **19 px** wysokości, odstęp krawędzi ok. 12 px. | Długie case study czyta się jak podpis, nie jak tekst. Wersaliki mono przy każdej sekcji są ozdobą, nie informacją. | Body 17–18 px. Kicker 13 px, jeden krój z tekstem, bez wersalików. Stopka: padding do min. 24 px wysokości celu. | Średni | Mały |
| Obramowania | `--border-default #4A4C55` na `#111214` = **2,19:1**. `--border-subtle #32343C` na bazie = **1,51:1**, na powierzchni `#22242C` = **1,25:1**. Pole formularza używa `#8D8680` i ma **5,22:1**. | Ramka karty jest jej granicą i wpada pod próg 3:1 z WCAG 1.4.11. Linie sekcji są dekoracyjne (1.4.11 ich nie dotyczy), ale sekcje zlewają się ze sobą. | Ramka komponentu minimum 3:1. Sekcje rozdzielać zmianą powierzchni albo większym oddechem, nie włosową kreską. | Średni | Mały |
| Metadane i LCP | W `index.html` nie ma Open Graph, Twitter Card ani obrazu udostępniania. Obraz hero jest importem w bundlu JS (`hero-interface-….webp`, 121 KB), więc HTML startuje od pustego `#root`. W laboratorium (1,6 Mb/s, 150 ms RTT, cache off): FP 404 ms, FCP i LCP **836 ms**, element LCP to `H1`, DCL 771 ms. Transfer strony głównej bez leniwych miniatur Graffa: **627 KB**. | Link w Slacku albo na LinkedInie nie ma podglądu. Pierwszy sensowny ekran czeka na JS. | Dodać `og:title`, `og:description`, `og:image` 1200×630 z prawdziwego ekranu. Preload hero albo wynieść LCP do HTML. Haszowane assety trzymać dłużej niż `max-age=600`. | Średni | Mały |
| Prototyp w case study | Pasek szerokości („Dopasuj / Telefon / Pulpit”) to `div` z `aria-label` i bez roli. Axe: incomplete `aria-prohibited-attr` — nazwa nie jest wystawiona. Na &lt; 56 rem ten pasek ma `display: none`. `iframe` ma sensowny `title` i `sandbox` bez `allow-same-origin`; skrypty prototypu i tak działają. | Grupa kontrolek nie ma nazwy w drzewie dostępności. Na telefonie nie da się przełączyć szerokości — zostaje „Dopasuj”. | `role="group"` na kontenerze albo `fieldset`/`legend`. Na wąskim ekranie zostawić jeden, świadomie wybrany kadr. | Niski | Mały |
| Alt miniatur | W danych są `thumbnailAlt` (np. „Ekran aplikacji FinLux…”). Na karcie obraz ma `alt=""` i siedzi w `aria-hidden`. Nazwa linku to „FinLux — zobacz projekt”. | Czytnik dostaje nazwę projektu i skrót, nie opis ekranu. To zgodne z dekoracyjnym obrazem, ale gotowy alt jest wyrzucony. | Jeśli kadr jest dowodem, przenieść `thumbnailAlt` do opisu linku (`aria-describedby` albo zdanie pod tytułem). Jeśli jest dekoracją, usunąć niewykorzystane pole, żeby specyfikacja nie kłamała. | Niski | Mały |

## 4. Audyt sekcja po sekcji

### 4.1 Hierarchia i czytelność

Na pulpicie 1440 px kolejność jest czytelna: pasek, H1, dwa przyciski, trzy projekty, usługi, proces, o mnie, kontakt, stopka. H1 ma 60 px / 67,2 px, tracking −1,32 px, szerokość 705 px i wysokość 202 px, czyli trzy wiersze. Lead ma 608 px przy 18 px, czyli około 60–68 znaków w wierszu. Nagłówki sekcji są w `max-width: 65ch`. To jest poprawna miara.

Hierarchia treści jest płaska. Każda sekcja zaczyna się tym samym wzorem: kicker `01 / PRACE`, H2, jeden akapit. „Dwa pełne case studies. Jedno dalsze studium.” opisuje spis treści, nie pracę. Usługi i proces nie mają żadnego elementu mocniejszego niż reszta listy, więc oko nie ma gdzie stanąć.

Kolor wyciszenia `#9A9A9F` na `#111214` ma kontrast **6,69:1**, na `#22242C` **5,53:1**. Oba przechodzą 4,5:1. Przez to prawie cały tekst pomocniczy — lead, opisy kart, akapity case study — jest tej samej szarości co etykiety. Hierarchia opiera się na rozmiarze, nie na kontraście, i przy 15 px body różnica między „treścią” a „podpisem” jest mała.

### 4.2 Layout, grid, spacing, rytm

Szerokość kolumny: `min(100%, 72rem)` z gutterem `clamp(1.25rem, 0.9rem + 1.6vw, 2.5rem)`. Na 1440 px treść zaczyna się około x = 181. To jest spokojny, szeroki margines.

Rytm pionowy jest jednostajny. Od 64 rem w górę `.band` ma `padding-block: 5.5rem` (88 px). Zmierzona wysokość:

| Sekcja | Wysokość przy 1440×900 |
| --- | --- |
| Hero `#top` | 547 px |
| `#prace` | 2852 px |
| `#uslugi` | 543 px |
| `#proces` | 712 px |
| `#o-mnie` | 410 px |
| `#kontakt` | 982 px |
| Stopka | 291 px |
| Dokument | 6405 px |

Prace zjadają prawie połowę strony, bo każda karta to pełna szerokość kolumny i ramka min. 28 rem. Usługi i proces to listy z hairline, bez drugiej kolumny treści na dużym ekranie (usługi łapią dwie kolumny dopiero od 48 rem: numer i opis). O mnie jest samym nagłówkiem. Kontakt wreszcie ma dwie kolumny od 56 rem i jest jedyną sekcją, która wygląda jak zaprojektowany układ, nie jak stos akapitów.

Siatki 12-kolumnowej nie ma. Wyróżnione projekty nie stoją obok siebie. Na 1440 px prawa połowa sekcji prac jest pusta mata.

### 4.3 Typografia

| Rola | Zmierzona wartość przy 1440 px | Ocena |
| --- | --- | --- |
| H1 | Plus Jakarta Sans 60 / 67,2, weight 700, tracking −0,022 em | Skala jest wystarczająca. Treść jest generyczna, więc duży stopień niczego nie wyróżnia. |
| H2 | clamp 1,75–2 rem, weight 700 | Blisko H3. Sekcje nie mają własnego głosu. |
| H3 | clamp 1,25–1,4 rem, weight 600 | Wystarcza na tytuł karty. |
| Body | 15,18 px / 1,5 | Za mało do case study. Przy zoomie 200% (1.4.4) skala rem urośnie, bo rozmiary są w rem — to jest zrobione świadomie. |
| Lead | 18 px / 1,6, `#9A9A9F` | 18 px zwykłego tekstu nadal wymaga 4,5:1. Kontrast przechodzi. |
| Badge | 11,95 px, JetBrains Mono, wersaliki, tracking 0,08 em, line-height 1 | Najczęstszy sygnał „szablonu 2024–2026”. 12 px wersalików jest na granicy czytelności polskich znaków. |

Plus Jakarta Sans Variable i JetBrains Mono Variable są self-hosted, po dwa pliki (latin i latin-ext). Polskie znaki w H1 („Projektuję”) renderują się poprawnie — latin-ext jest użyty. `font-display: swap` jest ustawiony. Cztery pliki woff2 ważą łącznie około 106 KB transferu. To jest rozsądny budżet, ale drugi krój idzie prawie wyłącznie na ozdobne etykiety.

### 4.4 Kolor i dark mode

Jest tylko tryb ciemny: `color-scheme: dark` i `theme-color: #111214`. Nie ma przełącznika i nie ma jasnej wersji. To spójna decyzja, o ile kontrast trzyma próg.

| Para | Stosunek | Próg AA | Wynik |
| --- | --- | --- | --- |
| `#EDEAE3` na `#111214` | 15,60:1 | 4,5:1 | Przechodzi |
| `#9A9A9F` na `#111214` | 6,69:1 | 4,5:1 | Przechodzi |
| `#9A9A9F` na `#22242C` | 5,53:1 | 4,5:1 | Przechodzi |
| `#C9A876` na `#111214` | 8,34:1 | 4,5:1 | Przechodzi |
| `#C9A876` na `#22242C` | 6,89:1 | 4,5:1 | Przechodzi |
| `#111214` na `#C9A876` (przycisk) | 8,34:1 | 4,5:1 | Przechodzi |
| `#F0C7BA` na `#111214` (błąd) | 12,12:1 | 4,5:1 | Przechodzi |
| H1 na próbce tła hero | 15,71:1 | 4,5:1 | Przechodzi |
| Lead na próbce tła hero | 6,73:1 | 4,5:1 | Przechodzi |
| Fakt „Co” (mosiądz) na próbce pod tekstem | 4,55:1 | 4,5:1 | Przechodzi na styk |
| Tekst faktu na próbce pod tekstem | 7,38:1 | 4,5:1 | Przechodzi |
| Obramowanie pola `#8D8680` na `#111214` | 5,22:1 | 3:1 | Przechodzi |
| `#4A4C55` na `#111214` | 2,19:1 | 3:1 dla granicy komponentu | Poniżej progu |

Axe na stronie głównej nie zgłosił violations kontrastu. 21 wyników `incomplete` wynika z tego, że tło hero jest pseudoelementem i obrazem — stąd pomiary pikselowe powyżej. Najciaśniejszy punkt to mosiężna etykieta w kolumnie faktów, tam gdzie gradient schodzi do 0,55 krycia i przebija zdjęcie.

Mosiądz na prawie czarnym, mono w wersalikach i numeracja `01 / 02 / 03` to obecnie domyślny wygląd ciemnych stron „premium”. Paleta sama w sobie jest czysta. Nie niesie koloru produktów, które portfolio pokazuje (zieleń cashflow, niebieski czat, fiolet dawek). Dark mode jest technicznie poprawny i stylistycznie wymienny.

### 4.5 Nawigacja i architektura informacji

Pięć kotwic: Prace, Usługi, Proces, O mnie, Kontakt, plus CTA. Skip link, `scroll-margin-top: 5rem` przy pasku 69 px, `aria-current` na aktywnej sekcji. Desktopowe linki mają około 33–34 px wysokości i duże odstępy (3,5 rem), więc cel 24 px z WCAG 2.5.8 jest spełniony.

Ścieżka na pulpicie jest krótka: pasek albo przycisk „Zobacz wybrane projekty” → karta → case study → „Wróć do prac”. Aktywna sekcja jest śledzona przez `IntersectionObserver`. To działa jako spis jednej strony.

Architektura nie odpowiada decyzji, którą ma podjąć odbiorca. Usługi i proces stoją między pracami a kontaktem i nie zawierają informacji, której nie da się powiedzieć jednym zdaniem przy pracach. O mnie nie odpowiada „kto”. Kontakt odpowiada „jak napisać”, nie „co się stanie po napisaniu”.

Na telefonie ścieżka urywa się na menu. Szczegóły w tabeli. Dodatkowo przy 896–940 px etykieta „O mnie” łamie się na dwa wiersze.

### 4.6 Hero, projekty, case studies, CTA

**Hero.** Dwa przyciski mają po 44 px wysokości: „Zobacz wybrane projekty” (primary) i „Opowiedz o projekcie” (ghost). Oba prowadzą do kotwic tej samej strony. Prawy blok faktów na 1440 px stoi na jaśniejszym kawałku zdjęcia; zmierzony kontrast etykiety to 4,55:1. Na 768 i 390 px fakty spadają pod tekst, a zdjęcie znika pod gradientem 0,94.

**Projekty.** Trzy karty. FinLux i BarthMoney są `featured`, Graff jest „Dalsze studium” z dwoma miniaturami. Hover na pulpicie podnosi ramkę i pokazuje „Otwórz ↗”; na dotyku tej warstwy nie ma, zostaje tekst „Zobacz projekt ↗” w stopce karty. Link rozciągnięty przez `::after` na całą kartę jest poprawnym wzorcem. Kliknięty obszar jest duży. Focus rysuje się na tytule i zmienia border karty.

**Case study FinLux** (status HTTP 404, tytuł w karcie „FinLux — John Pavulon”). Podgląd zaczyna się na y = 451 i ma 1028 px, z czego sam iframe ma 648 px. W kadrze widać makietę cashflow: saldo, wykres, kategorie. Pod spodem bloki o przykładowych danych. Narzędzia: HTML, CSS. Strona usług jednocześnie oferuje „Front-end” w HTML, CSS, React i TypeScript. **Obserwacja:** case studies nie pokazują Reacta ani TypeScriptu. Portfolio jako aplikacja jest w React 19 i TypeScript, ale tego nie widać w pracach.

**BarthMoney.** Cztery telefony obok siebie w szerokim podglądzie. To najlepszy dowód na stronie: widać nawigację, czat z kwotą 42,50 zł i pusty stan. Na wąskim oknie klatki układają się jedna pod drugą — tak opisuje to sam interfejs.

**Graff.** Dwa widoki: kalendarz zmian i plan dawek. Kalendarz jest interaktywny (miesiące, typy zmian). To jedyne miejsce, w którym widać zachowanie, nie tylko kompozycję.

**CTA.** W stopce i w formularzu e-mail `john@pavulon.dev` jest linkiem oraz przyciskami „Kopiuj adres” i „Otwórz mailto”. Kopiowanie ma `aria-live`. Sam brief nie zostawia śladu na serwerze.

### 4.7 Responsywność i telefon

| Viewport | `scrollWidth` | Overflow poziomy | Co widać |
| --- | --- | --- | --- |
| 1440 | 1440 | nie | Pełny hero, nav w jednej linii |
| 1024–1280 | równy viewport | nie | Nav mieści się, CTA w jednej linii |
| 1000 | 1000 | nie | „O mnie” już w jednej linii (50×33) |
| 896–940 | równy viewport | nie | „O mnie” 34–41×55, CTA zawinięty |
| 768 | 768 | nie | Menu „Menu”, hero w jednej kolumnie |
| 390 | **646** | tak | Karty 626 px, menu poza kadrem |
| 360 | **646** | tak | Ten sam mechanizm |

Przy 390 px przyciski hero mają 44 px i łamią się jeden pod drugim. To jest poprawne. Psuje się dopiero lista prac: wyróżniona ramka 626×352 wychodzi 256 px poza ekran. Para Graffa ma 512×288 i też nie mieści się w 390.

Menu: zrzut viewportu 390×844 po kliknięciu „Menu” pokazuje ciemne pole, „Zamknij” w prawym górnym rogu i ucięty mosiężny pasek na dole kadru. Zrzut elementu `.nav-panel` pokazuje komplet linków, ale panel ma 646 px szerokości. Fokus ląduje na „Zamknij”, który w układzie jest na x = 544.

Na case study telefonu podgląd FinLux jest dosunięty do lewej, a reszta szerokiej klatki zostawia pustkę. Przełącznik Telefon/Pulpit jest schowany.

### 4.8 Mikrointerakcje

- Hero: przesunięcie tła maksymalnie o kilka pikseli przy ruchu myszy i scrollu (`--hero-shift` do 6 px / 4 px). Przykryte gradientem 90% jest prawie niewidoczne. Przy reduced motion transform jest zablokowany.
- Karty: border, cień i `scale(1.025)` obrazu w 500 ms. Hover jest dyskretny. Na telefonie go nie ma.
- Przyciski: zmiana tła w 150 ms, `:active` podglądu przesuwa się o 1 px.
- Podgląd: pasek ładowania 1,1 s, przycisk „Uruchom ponownie podgląd”.
- Formularz: błąd nie przesuwa layoutu, bo `.field-error` ma `min-height: 1.5em` nawet gdy jest pusty. Stąd równe, dość duże dziury między polami.
- Brak stanu loading całej strony, brak przejścia między stroną główną a case study poza skokiem scrolla na górę.

Ruch jest ostrożny i nie szkodzi. Nie prowadzi też oka do pracy.

### 4.9 WCAG 2.2 AA

Spełnione albo blisko spełnienia, na podstawie kodu żywego DOM i axe:

- 1.1.1: obrazy kart są świadomie dekoracyjne, nazwa jest w linku. Alt z danych nie jest użyty.
- 1.3.1: sekcje mają `aria-labelledby`, formularz ma `label` i `aria-describedby`.
- 1.4.3: pary tekstu z tokenów przechodzą 4,5:1. Etykieta faktu na zdjęciu: 4,55:1.
- 1.4.4: skala w `rem` i `clamp` z członem rem.
- 1.4.11: pola formularza przechodzą; ramka karty 2,19:1 nie przechodzi, jeśli traktować ją jako granicę komponentu.
- 2.1.1, 2.4.1, 2.4.7: skip link, focus widoczny, menu zamykane Escape.
- 2.4.2: tytuły „John Pavulon — strony i aplikacje mobilne”, „FinLux — John Pavulon”, „Nie ma tej strony — John Pavulon”.
- 2.5.8: główne przyciski 44 px. Linki stopki 19 px z odstępem krawędzi około 12 px — okrąg 24 px sąsiednich celów się nie przecina, więc wyjątek odstępu prawdopodobnie przechodzi. To nadal słaby cel palcem.
- 3.3.1 / 3.3.2: błędy formularza są w tekście i przy polu.
- 4.1.2: `div[aria-label="Szerokość podglądu"]` bez roli — nazwa nie jest wystawiona (axe incomplete, nie violation).
- 2.3.3 / 2.2.2: reduced motion jest obsłużony. Autoplay wideo nie ma.
- 1.4.10: **niespełnione** na 320–390 px przez poziomy scroll całej strony.
- 2.4.11 (Focus Not Obscured, AA w 2.2): pasek ma 69 px i `scroll-margin` 5 rem. Nie znalazłem fokusu chowanego pod paskiem na stronie głównej. W otwartym menu mobilnym fokus „Zamknij” jest poza wizualnym kadrem — to praktycznie łamie sens 2.4.11 i 2.4.7 na telefonie.
- 3.1.1: `lang="pl"` na portfolio. Korzeń domeny ma `lang="en-US"`.
- 2.5.7 Dragging: nie dotyczy. 2.5.3 Label in Name: przyciski mają widoczny tekst zgodny z nazwą.

Axe na stronie głównej (desktop i mobile) i na Graffie: **0 violations**. Incomplete: kontrast tam, gdzie tło jest obrazem, plus `aria-prohibited-attr` i `frame-tested` (iframe trzeba by testować osobno). Brak violation nie znaczy, że 1.4.10 przechodzi — reguła reflow nie jest w pełni pokryta przez axe, a overflow zmierzyłem bezpośrednio.

### 4.10 Wiarygodność i skuteczność

**Obserwacje, które obniżają zaufanie:**

- Trzy nazwy: John Pavulon, `john@pavulon.dev`, Dixie Leuschke na korzeniu domeny i w tytule Jekylla.
- Adres końcowy po HTTP.
- Wszystkie prace są koncepcją albo demonstracją. Narzędzia w case study to HTML/CSS/JS.
- Brak klienta, braku liczb autor broni wprost („Makieta nie mierzy skutku, więc nie podaję liczb.”). To jest etyczne i jednocześnie zostawia rekrutera bez dowodu skutku.
- Brak osoby: zero zdjęcia, lokalizacji, stażu, referencji, linku do kodu.
- CTA nie wysyła briefu.

**Założenie:** odbiorcą jest albo mała firma szukająca strony, albo rekruter szukający designera/front-endu. Copy mówi „firm i osób, które potrzebują nowej strony, aplikacji mobilnej albo lepszego wyglądu”. Dla obu grup brakuje dowodu, że autor dowozi produkt poza makietą. Dla rekrutera dodatkowo brakuje śladu React/TypeScript w pracach, choć sam serwis jest w tym stacku.

Uczciwe plakietki statusu są zaletą. W tej formie zamykają sprzedaż, zamiast ją otwierać, bo obok nich nie ma żadnej pracy oznaczonej jako wdrożenie.

### 4.11 Co wygląda generycznie albo niespójnie

Generyczne, powtarzalne w ciemnych portfolio z lat 2024–2026:

- Near-black, jeden akcent „biżuteryjny” (tu mosiądz), cienkie linie, badge-pill.
- Kicker `01 / PRACE` w mono i wersalikach nad każdym H2.
- Hero z wielkim zdaniem, dwoma przyciskami i kolumną Co/Jak/Dalej.
- Stockowy dashboard jako „atmosfera”, przykryty prawie na czarno.
- Ramka przeglądarki z trzema kropkami wokół iframe.
- Lista usług i czterokrokowy proces bez żadnego śladu prawdziwego projektu.

Niespójne względem samych prac:

- Prototypy są jasne, gęste, produktowe (finanse, grafik, dawki). Oprawa jest ciemna i biżuteryjna. Oprawa nie pochodzi z materiału prac.
- H1 obiecuje działający front-end. Plakietki mówią „koncepcja” i „demonstracja”.
- Usługa „Front-end” wymienia React i TypeScript. Narzędzia przy pracach ich nie zawierają.

Nie wygląda to na przypadek złej grafiki. Wygląda na dopracowany szablon, w którym prawdziwe ekrany są wklejone w zbyt duże ramy.

### 4.12 Technika, która psuje UX albo wydajność

- **Overflow 646 px** i menu `fixed` względem rozepchanego layout viewportu (`innerWidth` 646 przy kadrze 390). Przyczyna w CSS: `min-height` + `aspect-ratio` na `.project-card__media`.
- **Łańcuch HTTP.** 301 z GitHub Pages na `http://`, potem 307 z powodu certyfikatu `*.github.io`.
- **Case study = 404.** SPA się odpala, status zostaje 404. Podglądy linków i część botów dostanie błąd.
- **Korzeń domeny** serwuje inny site (Jekyll, en-US).
- **Brak SSR.** Treść jest w bundlu `index-BGAtp279.js` (transfer 81 KB, decoded 255 KB). CSS 5,7 KB transferu / 23 KB decoded.
- **LCP w laboratorium** to H1 przy 836 ms na throttlingu 1,6 Mb/s. Obraz hero (121 KB) dochodzi z JS, nie z HTML.
- **Cache** haszowanych plików: `max-age=600`.
- **Miniatury:** FinLux 141 KB, BarthMoney 166 KB, Graff 238 KB, suplementacja 186 KB, leniwie ładowane. Na telefonie i tak wymuszają szerokość większą niż ekran, więc koszt jest, a kadr ucięty.
- Konsola przy przejściu audytu: brak błędów sieci. Obrazy po dojechaniu do sekcji są kompletne.
- `will-change: transform` na tle hero jest stały. Przy tak małym ruchu lepiej ustawiać go tylko na czas gestu.

## 5. Rekomendowany kierunek wizualny

Strona ma pokazywać interfejsy, które autor naprawdę narysował. Oprawa powinna być cichsza niż te interfejsy.

**Styl.** Stanowisko projektowe: ciemne, gęste, bez biżuterii. Jeden podpisany ekran na pierwszym widoku. Reszta to specyfikacja tego ekranu — decyzja, ograniczenie, rola — a nie kolejna sekcja agencyjna. Numeracja `01 / 02 / 03` wypada. Zostaje tylko tam, gdzie kolejność jest procesem i ma znaczenie (cztery kroki współpracy mogą być osią czasu, jeśli każdy krok ma artefakt, nie slogan).

**Paleta.** Zostawić ciemne tło, zdjąć mosiądz jako kolor „luksusu”.

| Token | Hex | Rola |
| --- | --- | --- |
| Tło | `#101210` | baza |
| Powierzchnia | `#1A1E1B` | sekcje |
| Tekst | `#F4F1EA` | treść |
| Tekst drugi | `#C6C2B8` | opisy, bliżej 7:1 niż obecne 5,5:1 |
| Akcent | `#D6F25C` | jeden sygnał z interfejsów (akcja, focus, link). Używany na małych polach, nie jako poświata |
| Linia | `#3C433E` | minimum około 3:1 do tła |

Akcent ma pochodzić z prac (zieleń decyzji w finansach, nie złoto). Jeśli ten konkretny żółtozielony wyda się zbyt bliski modzie „acid”, wziąć niebieski z czatu BarthMoney i trzymać się jednego. Nie mieszać.

**Typografia.** Jeden grotesk z polskimi znakami, o węższym rysunku niż Plus Jakarta — na przykład Schibsted Grotesk. H1 48–56 px, dwie linie, tracking około −0,03 em. Body 18 px / 1,55. Mono tylko przy danych: `390×844`, status HTTP, nazwa pliku podglądu. Wyrzucić wersaliki z kickerów.

**Odstępy.** Kolumna 72 rem może zostać. Sekcje 4,5–6 rem tylko przy zmianie tematu. Karty w siatce, odstęp 1,25 rem, bez pustej maty 16:9. Miara tekstu 60–66 ch. Pierwszy ekran kończy się prawdziwym UI, nie faktem „Dalej”.

**Prezentacja projektów.** Jeden wyróżniony projekt na całą szerokość: urządzenie przycięte do krawędzi UI, obok trzy zdania (problem, decyzja, rola) i link „Otwórz prototyp”. Reszta prac w dwóch kolumnach na desktopie, jednej na telefonie, miniatura = ekran, nie billboard. W case study prototyp jest pierwszy, bez fałszywej ramki okna. Tekst pod nim mieści się w jednym przewinięciu.

**Ruch.** Jedno wejście: ekran w hero dojeżdża 12 px w 400 ms. Hover karty przesuwa UI o 8 px, bez scale na całym obrazie. Reduced motion zostaje tak, jak jest teraz. Bez parallaxy na zdjęciu, którego i tak nie widać.

## 6. Plan wdrożenia

### Quick wins

- Rozpiąć konflikt `min-height` i `aspect-ratio` na kartach. Sprawdzić 360 i 390 px: `scrollWidth === clientWidth`.
- Menu: `100dvh` / `100vw`, fokus na pierwszym linku. Po fixie overflow i tak przetestować osobno.
- Skrócić CTA w pasku albo podnieść breakpoint, żeby przy 896 px nic się nie zawijało.
- Body do 17–18 px. Kicker bez wersalików.
- Ramka karty do kontrastu ≥ 3:1.
- Jedna etykieta akcji kontaktowej.
- `og:image` z prawdziwego ekranu.

### Etap 1

- Hero bez stocku: teza + jeden prototyp.
- Siatka prac i nowe kadry miniatur (eksport bez marginesów).
- Sekcja o mnie z faktami.
- Case study: prototyp, trzy bloki, status HTTP 200.
- HTTPS i jeden kanoniczny host. Korzeń domeny prowadzi do portfolio albo w ogóle nie używa tej domeny.
- Formularz, który przyjmuje brief, z mailto jako zapasem.

### Etap 2

- Nowa paleta i jeden krój, zgodnie z kierunkiem z sekcji 5.
- Przepisać usługi i proces tak, żeby każdy punkt miał artefakt (fragment architektury, token, komponent), nie slogan.
- Pokazać w co najmniej jednym case study ten sam stack, którego używa serwis, jeśli React/TypeScript ma być ofertą.
- Ruch ograniczony do jednego wejścia i hovera karty.

### Opcjonalne

- Jasny motyw, tylko jeśli ma własną paletę, nie odwrócone tokeny.
- Krótki zapis „wybrane wdrożenie” w dniu, w którym pojawi się praca z prawdziwym kontekstem.
- Osobna strona CV pod rekrutera, skrócona do sześciu ekranów.

## 7. Pięć zmian o największym wpływie

1. **Naprawić szerokość kart i menu na telefonie.** Bez tego portfolio nie da się użyć na urządzeniu, dla którego autor projektuje.
2. **Postawić HTTPS i jedną tożsamość.** Koniec łańcucha `github.io` → `http://johnpavulon.me` i koniec szablonu „Dixie Leuschke” na korzeniu domeny.
3. **Wymienić hero i ramy prac na prawdziwe ekrany.** Zdjąć stock, 16:9 matę i powtórzone fakty. Zostawić interfejs, który już jest w BarthMoney i Graffie.
4. **Złożyć autora i kontakt w jedną decyzję.** Krótko kim jest, co dowozi, jedna nazwa przycisku, brief który dociera.
5. **Skrócić case study i serwować je statusem 200.** Prototyp na górze, trzy decyzje, link który nie jest stroną 404.

## Dowody

Ścieżki względem tego pliku.

Hero, 1440 px. Prawa strona odsłania stockowy pulpit, lewa jest zasłonięta. Fakty powtarzają lead.

![Hero desktop 1440](dowody/desktop-1440-hero.png)

Wejście w prace. Ramka 16:9, telefon na środku ciemnej maty.

![Sekcja prac](dowody/desktop-1440-y900.png)

Karta FinLux wycięta z DOM.

![Karta FinLux](dowody/card-finlux.png)

Karta Graff: dwa ekrany w jednej ramce, nagłówek miesiąca na krawędzi.

![Karta Graff](dowody/card-graff.png)

Dalsza część listy prac.

![Prace, dalszy kadr](dowody/desktop-1440-y1800.png)

Usługi i początek procesu. Ten sam wzór kickera.

![Usługi](dowody/desktop-1440-y3600.png)

O mnie — jeden akapit.

![O mnie](dowody/desktop-1440-y4500.png)

Kontakt i stopka.

![Kontakt](dowody/desktop-1440-y5400.png)

Pusty submit. Tekst podsumowania odczytany z DOM: „Uzupełnij formularz, zanim go wyślesz.” wraz z czterema komunikatami pól. Kadr złapał nagłówek sekcji; blok błędu jest w dokumencie bezpośrednio pod nim.

![Formularz po pustym submit](dowody/desktop-1440-form-errors.png)

Focus klawiatury, obrys mosiężny 2 px. Pierwszy Tab to „Przejdź do treści” (potwierdzone przez `document.activeElement`).

![Focus](dowody/desktop-1440-focus-skip.png)

Próg 896 px: menu desktopowe już włączone, pasek ściśnięty.

![Viewport 896](dowody/viewport-896-top.png)

1024 px: CTA z powrotem w jednej linii.

![Viewport 1024](dowody/viewport-1024-top.png)

768 px: hamburger, jedna kolumna.

![Viewport 768](dowody/viewport-768-top.png)

Telefon 390 px, hero.

![Mobile hero](dowody/mobile-390-hero.png)

Telefon, sekcja prac. Miniatura szersza niż kadr.

![Mobile prace](dowody/mobile-390-y800.png)

Telefon, niżej w pracach. Poziomy scroll nadal trwa.

![Mobile prace dalej](dowody/mobile-390-y1600.png)

To widzi telefon po „Menu”: „Zamknij” i fragment paska.

![Menu, viewport 390](dowody/menu-viewport.png)

To zawiera panel, gdy sfotografować cały element (646 px): linki są, tylko poza kadrem telefonu.

![Menu, cały panel](dowody/menu-panel-element.png)

Case study FinLux, pierwszy viewport 1440 px. Podgląd w ramce przeglądarki. Dokument przyszedł ze statusem 404.

![Case FinLux](dowody/case-finlux-viewport-real.png)

Graff, działający kalendarz w podglądzie.

![Case Graff](dowody/case-graff-y900.png)

BarthMoney, cztery klatki.

![Case BarthMoney](dowody/case-barth-preview-element.png)

Podgląd FinLux na 390 px.

![Mobile case FinLux](dowody/mobile-390-case-finlux-preview.png)

Korzeń domeny.

![Korzeń johnpavulon.me](dowody/domain-root.png)

Nieistniejący case. Ta sama typografia, komunikat „Nie ma tej strony.”

![Brak strony](dowody/missing-page.png)
