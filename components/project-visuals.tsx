import type { Project } from "@/lib/site";

const mono = "var(--font-mono)";
const display = "var(--font-display)";

function SeaterVisual() {
  const cols = 6;
  const rows = 4;
  const seatW = 54;
  const seatH = 42;
  const startX = 44;
  const startY = 126;
  const gapX = 12;
  const gapY = 12;
  const occupied = new Set([0, 3, 5, 7, 8, 10, 15, 16, 19, 21]);
  const target = { row: 2, col: 1 };

  const seats = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      index,
      row,
      col,
      x: startX + col * (seatW + gapX),
      y: startY + row * (seatH + gapY),
      label: `${String.fromCharCode(65 + row)}-${String(col + 1).padStart(2, "0")}`,
      isTarget: row === target.row && col === target.col,
      isOccupied: occupied.has(index),
    };
  });

  const targetSeat = seats.find((seat) => seat.isTarget);

  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <text x="26" y="30" fontFamily={mono} fontSize="13" letterSpacing="1.6" fill="var(--color-ink)" fillOpacity="0.72">
        MEC / EXAM HALL C
      </text>
      <text x="614" y="30" textAnchor="end" fontFamily={mono} fontSize="11" letterSpacing="1.2" fill="var(--color-ink-faint)">
        42 SEATS · ROWS A–D
      </text>

      <rect x="26" y="52" width="354" height="46" fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" />
      <text x="42" y="70" fontFamily={mono} fontSize="8.5" letterSpacing="1.4" fill="var(--color-accent)">
        ROLL NO. OR NAME
      </text>
      <text x="42" y="87" fontFamily={mono} fontSize="14" letterSpacing="0.6" fill="var(--color-ink)">
        21CS1042
      </text>
      <line x1="286" y1="62" x2="286" y2="88" stroke="var(--color-ink)" strokeOpacity="0.2" />
      <text x="298" y="84" fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-faint)">
        BLOCK C
      </text>
      <circle cx="352" cy="75" r="7.5" fill="none" stroke="var(--color-ink)" strokeOpacity="0.6" />
      <line x1="358" y1="81" x2="365" y2="88" stroke="var(--color-ink)" strokeOpacity="0.6" strokeWidth="1.4" />

      <text x="26" y="118" fontFamily={mono} fontSize="8" letterSpacing="1.6" fill="var(--color-ink-faint)">
        FRONT
      </text>

      {seats.map((seat) => (
        <g key={seat.index}>
          <rect
            x={seat.x}
            y={seat.y}
            width={seatW}
            height={seatH}
            fill={seat.isTarget ? "var(--color-accent)" : "var(--color-paper-light)"}
            fillOpacity={seat.isTarget ? 0.92 : seat.isOccupied ? 0.35 : 0.7}
            stroke={seat.isTarget ? "var(--color-accent)" : "var(--color-ink)"}
            strokeOpacity={seat.isTarget ? 1 : 0.3}
          />
          <text
            x={seat.x + seatW / 2}
            y={seat.y + seatH / 2 + 3.5}
            textAnchor="middle"
            fontFamily={mono}
            fontSize="10"
            letterSpacing="0.4"
            fill={seat.isTarget ? "var(--color-paper-light)" : "var(--color-ink)"}
            fillOpacity={seat.isTarget ? 1 : 0.72}
          >
            {seat.isTarget ? "C-02" : seat.label}
          </text>
          {seat.isOccupied && !seat.isTarget ? (
            <path
              d={`M${seat.x + seatW - 11} ${seat.y + 6} l5 5 M${seat.x + seatW - 6} ${seat.y + 6} l-5 5`}
              stroke="var(--color-ink)"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          ) : null}
        </g>
      ))}

      {["A", "B", "C", "D"].map((row, index) => (
        <text
          key={row}
          x="26"
          y={startY + index * (seatH + gapY) + seatH / 2 + 3}
          fontFamily={mono}
          fontSize="9"
          fill="var(--color-ink-faint)"
        >
          {row}
        </text>
      ))}

      {targetSeat ? (
        <>
          <rect
            x={targetSeat.x - 5}
            y={targetSeat.y - 5}
            width={seatW + 10}
            height={seatH + 10}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
          />
          <circle
            className="seat-pulse"
            cx={targetSeat.x + seatW / 2}
            cy={targetSeat.y + seatH / 2}
            r="33"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1"
          />
        </>
      ) : null}

      <path
        className="dash-line"
        d="M456 150 H444 V228 H136 V231"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <path
        d="M131 229 L136 236 L141 229"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1"
      />

      <rect x="456" y="126" width="158" height="150" fill="var(--color-paper-light)" fillOpacity="0.7" stroke="var(--color-accent)" strokeOpacity="0.65" />
      <text x="472" y="150" fontFamily={mono} fontSize="8" letterSpacing="1.6" fill="var(--color-accent)">
        MATCH FOUND
      </text>
      <text x="472" y="188" fontFamily={display} fontSize="42" fill="var(--color-ink)">
        C-02
      </text>
      <line x1="472" y1="200" x2="598" y2="200" stroke="var(--color-ink)" strokeOpacity="0.2" />
      <text x="472" y="220" fontFamily={mono} fontSize="9" letterSpacing="1" fill="var(--color-ink)">
        ROW C · SEAT 02
      </text>
      <text x="472" y="238" fontFamily={mono} fontSize="9" letterSpacing="1" fill="var(--color-ink-faint)">
        BLOCK C · GATE 3
      </text>
      <text x="472" y="260" fontFamily={mono} fontSize="8.5" letterSpacing="1.4" fill="var(--color-accent)">
        WALK 2 MIN
      </text>

      <rect x="44" y="222" width="384" height="1.5" fill="var(--color-accent)" fillOpacity="0.55" className="scan-line" />

      <line x1="26" y1="344" x2="614" y2="344" stroke="var(--color-ink)" strokeOpacity="0.18" />
      <text x="26" y="366" fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-soft)">
        QUERY → INDEX → SEAT
      </text>
      <text x="614" y="366" textAnchor="end" fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-faint)">
        MEDIAN LOOKUP 0.2S
      </text>
      <text x="26" y="386" fontFamily={mono} fontSize="8" letterSpacing="1.4" fill="var(--color-ink-faint)">
        NO LOGIN · NO NOTICE BOARD
      </text>
    </svg>
  );
}

function MafiaVisual() {
  const centerX = 320;
  const centerY = 210;
  const rx = 200;
  const ry = 130;
  const mafiaSeats = new Set([1, 7, 12]);
  const detectiveSeat = 4;
  const doctorSeat = 9;

  const seats = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
    return {
      index,
      x: centerX + Math.cos(angle) * rx,
      y: centerY + Math.sin(angle) * ry,
      isMafia: mafiaSeats.has(index),
      isDetective: index === detectiveSeat,
      isDoctor: index === doctorSeat,
    };
  });

  const roleFill = (seat: (typeof seats)[number]) => {
    if (seat.isMafia) return "var(--color-accent)";
    if (seat.isDetective) return "var(--color-pencil)";
    if (seat.isDoctor) return "var(--color-stamp)";
    return "var(--color-paper)";
  };

  return (
    <svg viewBox="0 0 640 420" aria-hidden="true" focusable="false">
      <text x="26" y="30" fontFamily={mono} fontSize="13" letterSpacing="1.6" fill="var(--color-ink)" fillOpacity="0.72">
        MAFIA / 16 PLAYERS
      </text>
      <text x="614" y="30" textAnchor="end" fontFamily={mono} fontSize="10" letterSpacing="1.2" fill="var(--color-accent)">
        SERVER AUTHORITATIVE
      </text>
      <text x="614" y="46" textAnchor="end" fontFamily={mono} fontSize="8.5" letterSpacing="1.2" fill="var(--color-ink-faint)">
        PRIVATE ROLE MAP · CLIENT VIEW
      </text>

      <ellipse cx={centerX} cy={centerY} rx={rx + 22} ry={ry + 22} fill="none" stroke="var(--color-ink)" strokeOpacity="0.18" strokeDasharray="2 7" />

      {seats
        .filter((seat) => seat.isMafia || seat.isDetective || seat.isDoctor)
        .map((seat) => (
          <line
            key={`link-${seat.index}`}
            className="dash-line"
            x1={centerX}
            y1={centerY}
            x2={seat.x}
            y2={seat.y}
            stroke={seat.isMafia ? "var(--color-accent)" : seat.isDetective ? "var(--color-pencil)" : "var(--color-stamp)"}
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        ))}

      <ellipse cx={centerX} cy={centerY} rx="152" ry="94" fill="var(--color-paper-deep)" fillOpacity="0.55" stroke="var(--color-ink)" strokeOpacity="0.3" />

      <text x={centerX} y="180" textAnchor="middle" fontFamily={mono} fontSize="10" letterSpacing="3" fill="var(--color-ink-faint)">
        NIGHT 02
      </text>
      <text x={centerX} y="226" textAnchor="middle" fontFamily={mono} fontSize="38" letterSpacing="2" fill="var(--color-ink)">
        02:14
      </text>
      <text x={centerX} y="248" textAnchor="middle" fontFamily={mono} fontSize="9" letterSpacing="2.4" fill="var(--color-accent)">
        DISCUSSION
      </text>

      {seats.map((seat) => (
        <g key={seat.index}>
          <circle
            cx={seat.x}
            cy={seat.y}
            r={seat.isMafia ? 15 : 13}
            fill={roleFill(seat)}
            fillOpacity={seat.isMafia || seat.isDetective || seat.isDoctor ? 1 : 0.85}
            stroke="var(--color-ink)"
            strokeOpacity="0.4"
            className={seat.isMafia ? "seat-pulse" : undefined}
          />
          <text
            x={seat.x}
            y={seat.y + 3}
            textAnchor="middle"
            fontFamily={mono}
            fontSize="8"
            fill={seat.isMafia || seat.isDetective ? "var(--color-paper-light)" : "var(--color-ink)"}
          >
            {String(seat.index + 1).padStart(2, "0")}
          </text>
        </g>
      ))}

      <text x="26" y="58" fontFamily={mono} fontSize="10" letterSpacing="1.4" fill="var(--color-ink-soft)">
        ROLE DISTRIBUTION / SEVER
      </text>
      <text x="26" y="74" fontFamily={mono} fontSize="8.5" letterSpacing="1.2" fill="var(--color-ink-faint)">
        CLIENT RECEIVES ONLY ITS OWN SLICE
      </text>

      <line x1="26" y1="358" x2="614" y2="358" stroke="var(--color-ink)" strokeOpacity="0.18" />

      <g fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-soft)">
        <circle cx="34" cy="378" r="5" fill="var(--color-accent)" />
        <text x="46" y="381">MAFIA ×3</text>
        <circle cx="158" cy="378" r="5" fill="var(--color-pencil)" />
        <text x="170" y="381">DETECTIVE</text>
        <circle cx="284" cy="378" r="5" fill="var(--color-stamp)" />
        <text x="296" y="381">DOCTOR</text>
      </g>
      <text x="614" y="381" textAnchor="end" fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-faint)">
        RECONNECT · 30S WINDOW
      </text>
    </svg>
  );
}

function MotherjaneVisual() {
  const lines = [132, 108, 146, 92, 124, 74, 136];
  const scores = [
    { label: "LEX-A / VADER", value: "0.72" },
    { label: "LEX-B / AFINN", value: "0.48" },
    { label: "LEX-C / CUSTOM", value: "0.63" },
  ];
  const bars = [36, 58, 50, 82, 68, 104, 90, 72, 48];

  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <text x="26" y="30" fontFamily={mono} fontSize="13" letterSpacing="1.6" fill="var(--color-ink)" fillOpacity="0.72">
        motherjane / TEXT → SIGNAL
      </text>
      <text x="614" y="30" textAnchor="end" fontFamily={mono} fontSize="10" letterSpacing="1.2" fill="var(--color-accent)">
        R PACKAGE
      </text>

      <text x="26" y="58" fontFamily={mono} fontSize="9" letterSpacing="2" fill="var(--color-ink-faint)">
        TEXT
      </text>
      {lines.map((width, index) => (
        <rect
          key={width + index}
          x="26"
          y={74 + index * 20}
          width={width}
          height="7"
          fill="var(--color-ink)"
          fillOpacity={index === 0 ? 0.55 : 0.22}
        />
      ))}
      <text x="26" y="236" fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-faint)">
        1,240 DOCUMENTS
      </text>

      <path className="dash-line" d="M206 135 H228" stroke="var(--color-accent)" strokeWidth="1" fill="none" strokeDasharray="3 4" />
      <path d="M224 130 L231 135 L224 140" fill="none" stroke="var(--color-accent)" strokeWidth="1" />

      <text x="248" y="58" fontFamily={mono} fontSize="9" letterSpacing="2" fill="var(--color-ink-faint)">
        LEXICONS
      </text>
      {scores.map((score, index) => (
        <g key={score.label}>
          <rect
            x="248"
            y={74 + index * 58}
            width="152"
            height="46"
            fill="var(--color-paper-light)"
            fillOpacity="0.7"
            stroke="var(--color-ink)"
            strokeOpacity="0.25"
          />
          <text x="258" y={91 + index * 58} fontFamily={mono} fontSize="8.5" letterSpacing="1" fill="var(--color-ink-soft)">
            {score.label}
          </text>
          <rect x="258" y={102 + index * 58} width="94" height="4" fill="var(--color-ink)" fillOpacity="0.12" />
          <rect
            x="258"
            y={102 + index * 58}
            width={94 * Number(score.value)}
            height="4"
            fill={index === 1 ? "var(--color-pencil)" : "var(--color-accent)"}
          />
          <text x="390" y={109 + index * 58} textAnchor="end" fontFamily={mono} fontSize="10" fill="var(--color-ink)">
            {score.value}
          </text>
        </g>
      ))}

      <path className="dash-line" d="M408 135 H430" stroke="var(--color-accent)" strokeWidth="1" fill="none" strokeDasharray="3 4" />
      <path d="M426 130 L433 135 L426 140" fill="none" stroke="var(--color-accent)" strokeWidth="1" />

      <text x="452" y="58" fontFamily={mono} fontSize="9" letterSpacing="2" fill="var(--color-ink-faint)">
        SIGNAL
      </text>
      <path
        className="wave-line"
        d="M452 168 C 474 126 492 204 512 156 S 548 128 570 166 S 596 178 608 160"
        fill="none"
        stroke="var(--color-pencil)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      {bars.map((height, index) => (
        <rect
          key={`${height}-${index}`}
          className="bar-pulse"
          x={452 + index * 17}
          y={300 - height}
          width="12"
          height={height}
          fill={index === 5 ? "var(--color-accent)" : "var(--color-ink)"}
          fillOpacity={index === 5 ? 0.9 : 0.22 + index * 0.04}
          style={{ animationDelay: `${index * 0.16}s` }}
        />
      ))}
      <line x1="452" y1="300" x2="608" y2="300" stroke="var(--color-ink)" strokeOpacity="0.35" />

      <text x="452" y="332" fontFamily={display} fontSize="26" fill="var(--color-ink)">
        +0.42
      </text>
      <text x="540" y="330" fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-accent)">
        POSITIVE
      </text>
      <text x="452" y="350" fontFamily={mono} fontSize="8" letterSpacing="1.2" fill="var(--color-ink-faint)">
        AGGREGATE SCORE
      </text>

      <line x1="26" y1="368" x2="614" y2="368" stroke="var(--color-ink)" strokeOpacity="0.18" />
      <g fontFamily={mono} fontSize="9" letterSpacing="1.2" fill="var(--color-ink-soft)">
        <text x="26" y="388">01 TOKENISE</text>
        <text x="146" y="388" fill="var(--color-accent)">→</text>
        <text x="172" y="388">02 SCORE</text>
        <text x="272" y="388" fill="var(--color-accent)">→</text>
        <text x="298" y="388">03 AGGREGATE</text>
      </g>
      <text x="614" y="388" textAnchor="end" fontFamily={mono} fontSize="8.5" letterSpacing="1.2" fill="var(--color-ink-faint)">
        NUMERIC-AWARE · MODULAR
      </text>
    </svg>
  );
}

function SeaterCompact() {
  const cols = 6;
  const rows = 3;
  const seatW = 74;
  const seatH = 44;
  const gap = 14;
  const startX = 63;
  const startY = 184;
  const occupied = new Set([0, 2, 4, 7, 9, 12, 15]);
  const target = { row: 1, col: 2 };

  const seats = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
      index,
      x: startX + col * (seatW + gap),
      y: startY + row * (seatH + gap),
      isTarget: row === target.row && col === target.col,
      isOccupied: occupied.has(index),
    };
  });

  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <text x="32" y="52" fontFamily={display} fontSize="34" fill="var(--color-ink)">
        Find your seat.
      </text>
      <text x="608" y="48" textAnchor="end" fontFamily={mono} fontSize="13" letterSpacing="1.4" fill="var(--color-accent)">
        EXAM HALL C
      </text>
      <text x="32" y="74" fontFamily={mono} fontSize="11" letterSpacing="1.2" fill="var(--color-ink-faint)">
        MEC / SEATING LOOKUP
      </text>

      <rect x="32" y="90" width="576" height="58" fill="none" stroke="var(--color-ink)" strokeOpacity="0.4" />
      <text x="52" y="127" fontFamily={mono} fontSize="23" letterSpacing="1" fill="var(--color-ink)">
        21CS1042
      </text>
      <circle cx="570" cy="119" r="9" fill="none" stroke="var(--color-ink)" strokeOpacity="0.55" />
      <line x1="577" y1="126" x2="585" y2="134" stroke="var(--color-ink)" strokeOpacity="0.55" strokeWidth="1.6" />

      <line x1="320" y1="154" x2="320" y2="170" stroke="var(--color-accent)" strokeWidth="1.5" />
      <path d="M314 166 L320 173 L326 166" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />

      {seats.map((seat) => (
        <g key={seat.index}>
          <rect
            x={seat.x}
            y={seat.y}
            width={seatW}
            height={seatH}
            fill={seat.isTarget ? "var(--color-accent)" : "var(--color-paper-light)"}
            fillOpacity={seat.isTarget ? 0.95 : seat.isOccupied ? 0.45 : 0.8}
            stroke={seat.isTarget ? "var(--color-accent)" : "var(--color-ink)"}
            strokeOpacity={seat.isTarget ? 1 : 0.28}
          />
          {seat.isTarget ? (
            <text
              x={seat.x + seatW / 2}
              y={seat.y + seatH / 2 + 6}
              textAnchor="middle"
              fontFamily={mono}
              fontSize="18"
              fill="var(--color-paper-light)"
            >
              C-02
            </text>
          ) : null}
          {seat.isOccupied && !seat.isTarget ? (
            <circle cx={seat.x + seatW / 2} cy={seat.y + seatH / 2} r="3" fill="var(--color-ink)" fillOpacity="0.28" />
          ) : null}
        </g>
      ))}

      <circle
        className="seat-pulse"
        cx={startX + target.col * (seatW + gap) + seatW / 2}
        cy={startY + target.row * (seatH + gap) + seatH / 2}
        r="44"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.2"
      />

      <line x1="32" y1="366" x2="608" y2="366" stroke="var(--color-ink)" strokeOpacity="0.18" />
      <text x="32" y="390" fontFamily={mono} fontSize="16" letterSpacing="1.2" fill="var(--color-ink-soft)">
        QUERY → SEAT
      </text>
      <text x="608" y="390" textAnchor="end" fontFamily={mono} fontSize="16" letterSpacing="1.2" fill="var(--color-ink-faint)">
        NO NOTICE BOARD
      </text>
    </svg>
  );
}

function MafiaCompact() {
  const centerX = 320;
  const centerY = 214;
  const rx = 202;
  const ry = 122;
  const mafiaSeats = new Set([1, 7, 12]);
  const detectiveSeat = 4;
  const doctorSeat = 9;

  const seats = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
    return {
      index,
      x: centerX + Math.cos(angle) * rx,
      y: centerY + Math.sin(angle) * ry,
      isMafia: mafiaSeats.has(index),
      isDetective: index === detectiveSeat,
      isDoctor: index === doctorSeat,
    };
  });

  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <text x="32" y="52" fontFamily={display} fontSize="36" fill="var(--color-ink)">
        Mafia.
      </text>
      <text x="608" y="48" textAnchor="end" fontFamily={mono} fontSize="14" letterSpacing="1.4" fill="var(--color-accent)">
        16 PLAYERS
      </text>
      <text x="32" y="74" fontFamily={mono} fontSize="11" letterSpacing="1.2" fill="var(--color-ink-faint)">
        REAL-TIME · SOCIAL DEDUCTION
      </text>

      <ellipse cx={centerX} cy={centerY} rx={rx + 20} ry={ry + 20} fill="none" stroke="var(--color-ink)" strokeOpacity="0.16" strokeDasharray="2 7" />

      {seats
        .filter((seat) => seat.isMafia || seat.isDetective || seat.isDoctor)
        .map((seat) => (
          <line
            key={`compact-link-${seat.index}`}
            className="dash-line"
            x1={centerX}
            y1={centerY}
            x2={seat.x}
            y2={seat.y}
            stroke={seat.isMafia ? "var(--color-accent)" : seat.isDetective ? "var(--color-pencil)" : "var(--color-stamp)"}
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        ))}

      <ellipse cx={centerX} cy={centerY} rx="146" ry="86" fill="var(--color-paper-deep)" fillOpacity="0.55" stroke="var(--color-ink)" strokeOpacity="0.3" />
      <text x={centerX} y="188" textAnchor="middle" fontFamily={mono} fontSize="13" letterSpacing="3" fill="var(--color-ink-faint)">
        NIGHT 02
      </text>
      <text x={centerX} y="234" textAnchor="middle" fontFamily={mono} fontSize="48" letterSpacing="2" fill="var(--color-ink)">
        02:14
      </text>
      <text x={centerX} y="256" textAnchor="middle" fontFamily={mono} fontSize="12" letterSpacing="2.4" fill="var(--color-accent)">
        DISCUSSION
      </text>

      {seats.map((seat) => (
        <circle
          key={seat.index}
          cx={seat.x}
          cy={seat.y}
          r={seat.isMafia ? 18 : seat.isDetective || seat.isDoctor ? 16 : 12}
          fill={seat.isMafia ? "var(--color-accent)" : seat.isDetective ? "var(--color-pencil)" : seat.isDoctor ? "var(--color-stamp)" : "var(--color-paper)"}
          fillOpacity={0.95}
          stroke="var(--color-ink)"
          strokeOpacity="0.35"
          className={seat.isMafia ? "seat-pulse" : undefined}
        />
      ))}

      <line x1="32" y1="360" x2="608" y2="360" stroke="var(--color-ink)" strokeOpacity="0.18" />
      <g fontFamily={mono} fontSize="16" letterSpacing="1" fill="var(--color-ink-soft)">
        <circle cx="40" cy="382" r="6" fill="var(--color-accent)" />
        <text x="54" y="388">MAFIA ×3</text>
        <circle cx="196" cy="382" r="6" fill="var(--color-pencil)" />
        <text x="210" y="388">DETECTIVE</text>
        <circle cx="364" cy="382" r="6" fill="var(--color-stamp)" />
        <text x="378" y="388">DOCTOR</text>
      </g>
      <text x="608" y="388" textAnchor="end" fontFamily={mono} fontSize="16" letterSpacing="1" fill="var(--color-accent)">
        LIVE
      </text>
    </svg>
  );
}

function MotherjaneCompact() {
  const scores = [
    { label: "LEX A", value: "0.72" },
    { label: "LEX B", value: "0.48" },
    { label: "LEX C", value: "0.63" },
  ];
  const bars = [28, 46, 38, 66, 52, 80, 62, 44];

  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <text x="32" y="52" fontFamily={display} fontSize="34" fill="var(--color-ink)">
        Text → signal.
      </text>
      <text x="608" y="48" textAnchor="end" fontFamily={mono} fontSize="13" letterSpacing="1.4" fill="var(--color-accent)">
        R PACKAGE
      </text>
      <text x="32" y="74" fontFamily={mono} fontSize="11" letterSpacing="1.2" fill="var(--color-ink-faint)">
        motherjane / MULTI-LEXICON SCORING
      </text>

      {scores.map((score, index) => {
        const y = 116 + index * 46;
        return (
          <g key={score.label}>
            <text x="32" y={y + 5} fontFamily={mono} fontSize="16" letterSpacing="1.2" fill="var(--color-ink-soft)">
              {score.label}
            </text>
            <rect x="132" y={y - 5} width="310" height="10" fill="var(--color-ink)" fillOpacity="0.12" />
            <rect
              x="132"
              y={y - 5}
              width={310 * Number(score.value)}
              height="10"
              fill={index === 1 ? "var(--color-pencil)" : "var(--color-accent)"}
            />
            <text x="466" y={y + 6} fontFamily={mono} fontSize="17" fill="var(--color-ink)">
              {score.value}
            </text>
          </g>
        );
      })}

      <line x1="32" y1="256" x2="608" y2="256" stroke="var(--color-ink)" strokeOpacity="0.18" />

      <text x="32" y="318" fontFamily={display} fontSize="58" fill="var(--color-ink)">
        +0.42
      </text>
      <text x="32" y="338" fontFamily={mono} fontSize="12" letterSpacing="1.2" fill="var(--color-accent)">
        AGGREGATE / POSITIVE
      </text>

      {bars.map((height, index) => (
        <rect
          key={`${height}-${index}`}
          className="bar-pulse"
          x={388 + index * 28}
          y={316 - height}
          width="18"
          height={height}
          fill={index === 5 ? "var(--color-accent)" : "var(--color-ink)"}
          fillOpacity={index === 5 ? 0.9 : 0.22 + index * 0.04}
          style={{ animationDelay: `${index * 0.16}s` }}
        />
      ))}
      <line x1="388" y1="316" x2="608" y2="316" stroke="var(--color-ink)" strokeOpacity="0.35" />

      <line x1="32" y1="360" x2="608" y2="360" stroke="var(--color-ink)" strokeOpacity="0.18" />
      <text x="32" y="388" fontFamily={mono} fontSize="15" letterSpacing="1.2" fill="var(--color-ink-soft)">
        TEXT → SCORE → SIGNAL
      </text>
      <text x="608" y="388" textAnchor="end" fontFamily={mono} fontSize="15" letterSpacing="1.2" fill="var(--color-ink-faint)">
        NUMERIC-AWARE
      </text>
    </svg>
  );
}

export function ProjectVisual({
  visual,
  caption,
  plate,
}: {
  visual: Project["visual"];
  caption: string;
  plate: string;
}) {
  return (
    <figure>
      <div className="plate-pastel" data-tint={visual}>
        <div className="flex items-center justify-between border-b border-ink/15 bg-paper-light/45 px-4 py-2.5">
          <span className="tag bg-paper-light/70 text-[0.52rem]">
            Plate {plate}
          </span>
          <span className="tag bg-paper-light/70 text-[0.52rem]">
            Schematic
          </span>
        </div>
        <div className="p-3 sm:p-5">
          <div className="sm:hidden">
            {visual === "seater" ? <SeaterCompact /> : null}
            {visual === "mafia" ? <MafiaCompact /> : null}
            {visual === "motherjane" ? <MotherjaneCompact /> : null}
          </div>
          <div className="hidden sm:block">
            {visual === "seater" ? <SeaterVisual /> : null}
            {visual === "mafia" ? <MafiaVisual /> : null}
            {visual === "motherjane" ? <MotherjaneVisual /> : null}
          </div>
        </div>
      </div>
      <figcaption className="annotation mt-3 flex gap-2">
        <span className="text-accent">Fig.</span>
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
