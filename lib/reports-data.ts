import { Transaction, sampleTransactions } from "./data";

export interface XReading {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  transactions: Transaction[];
  totalSales: number;
  totalTransactions: number;
  cashSales: number;
  digitalSales: number;
  cashier: string;
}

export interface ZReading extends XReading {
  closingCash: number;
  expectedCash: number;
  variance: number;
  closedBy: string;
}

export function generateXReading(
  transactions: Transaction[],
  cashier: string
): XReading {
  const totalSales = transactions.reduce((sum, t) => sum + t.total, 0);
  const cashSales = transactions
    .filter((t) => t.paymentMethod === "Cash")
    .reduce((sum, t) => sum + t.total, 0);
  const digitalSales = transactions
    .filter((t) => t.paymentMethod !== "Cash")
    .reduce((sum, t) => sum + t.total, 0);

  return {
    id: `X-${Date.now()}`,
    date: new Date(),
    startTime: new Date(new Date().setHours(0, 0, 0, 0)),
    endTime: new Date(),
    transactions,
    totalSales,
    totalTransactions: transactions.length,
    cashSales,
    digitalSales,
    cashier,
  };
}

export function generateZReading(
  transactions: Transaction[],
  closingCash: number,
  closedBy: string
): ZReading {
  const xReading = generateXReading(transactions, closedBy);
  const expectedCash = xReading.cashSales;
  const variance = closingCash - expectedCash;

  return {
    ...xReading,
    id: `Z-${Date.now()}`,
    closingCash,
    expectedCash,
    variance,
    closedBy,
  };
}

export function printXReading(reading: XReading): void {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>X-Reading ${reading.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Courier New', monospace;
          padding: 20px;
          max-width: 400px;
          margin: 0 auto;
        }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1 { font-size: 18px; margin-bottom: 5px; }
        .header p { font-size: 12px; }
        .divider { border-top: 2px dashed #000; margin: 15px 0; }
        .row { display: flex; justify-between; padding: 5px 0; font-size: 14px; }
        .row.bold { font-weight: bold; }
        .section-title { font-weight: bold; margin-top: 15px; margin-bottom: 10px; }
        .total { font-size: 16px; font-weight: bold; margin-top: 10px; }
        table { width: 100%; font-size: 12px; margin: 10px 0; }
        table td { padding: 3px 0; }
        @media print {
          body { padding: 10px; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>CLOUD POS</h1>
        <p>Sari-Sari Store System</p>
        <p>X-READING REPORT</p>
      </div>

      <div class="divider"></div>

      <div class="row">
        <span>Report ID:</span>
        <span>${reading.id}</span>
      </div>
      <div class="row">
        <span>Date:</span>
        <span>${reading.date.toLocaleDateString()}</span>
      </div>
      <div class="row">
        <span>Time:</span>
        <span>${reading.endTime.toLocaleTimeString()}</span>
      </div>
      <div class="row">
        <span>Cashier:</span>
        <span>${reading.cashier}</span>
      </div>

      <div class="divider"></div>

      <div class="section-title">SALES SUMMARY</div>
      <div class="row">
        <span>Total Transactions:</span>
        <span>${reading.totalTransactions}</span>
      </div>
      <div class="row">
        <span>Cash Sales:</span>
        <span>₱${reading.cashSales.toFixed(2)}</span>
      </div>
      <div class="row">
        <span>Digital Sales:</span>
        <span>₱${reading.digitalSales.toFixed(2)}</span>
      </div>

      <div class="divider"></div>

      <div class="row total">
        <span>TOTAL SALES:</span>
        <span>₱${reading.totalSales.toFixed(2)}</span>
      </div>

      <div class="divider"></div>

      <div class="section-title">TRANSACTIONS</div>
      <table>
        ${reading.transactions
          .map(
            (t) => `
          <tr>
            <td>${t.id}</td>
            <td>${t.paymentMethod}</td>
            <td style="text-align: right">₱${t.total.toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
      </table>

      <div class="divider"></div>

      <p style="text-align: center; font-size: 12px; margin-top: 20px;">
        This is a computer-generated report
      </p>

      <div style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 30px; font-size: 14px; cursor: pointer;">
          Print Report
        </button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}

export function printZReading(reading: ZReading): void {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Z-Reading ${reading.id}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: 'Courier New', monospace;
          padding: 20px;
          max-width: 400px;
          margin: 0 auto;
        }
        .header { text-align: center; margin-bottom: 20px; }
        .header h1 { font-size: 18px; margin-bottom: 5px; }
        .header p { font-size: 12px; }
        .divider { border-top: 2px dashed #000; margin: 15px 0; }
        .thick-divider { border-top: 3px double #000; margin: 15px 0; }
        .row { display: flex; justify-between; padding: 5px 0; font-size: 14px; }
        .row.bold { font-weight: bold; }
        .section-title { font-weight: bold; margin-top: 15px; margin-bottom: 10px; }
        .total { font-size: 16px; font-weight: bold; margin-top: 10px; }
        .variance { color: ${reading.variance >= 0 ? "green" : "red"}; }
        @media print {
          body { padding: 10px; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>CLOUD POS</h1>
        <p>Sari-Sari Store System</p>
        <p>Z-READING REPORT (END OF DAY)</p>
      </div>

      <div class="thick-divider"></div>

      <div class="row">
        <span>Report ID:</span>
        <span>${reading.id}</span>
      </div>
      <div class="row">
        <span>Date:</span>
        <span>${reading.date.toLocaleDateString()}</span>
      </div>
      <div class="row">
        <span>Time:</span>
        <span>${reading.endTime.toLocaleTimeString()}</span>
      </div>
      <div class="row">
        <span>Closed By:</span>
        <span>${reading.closedBy}</span>
      </div>

      <div class="divider"></div>

      <div class="section-title">SALES SUMMARY</div>
      <div class="row">
        <span>Total Transactions:</span>
        <span>${reading.totalTransactions}</span>
      </div>
      <div class="row">
        <span>Cash Sales:</span>
        <span>₱${reading.cashSales.toFixed(2)}</span>
      </div>
      <div class="row">
        <span>Digital Sales:</span>
        <span>₱${reading.digitalSales.toFixed(2)}</span>
      </div>

      <div class="divider"></div>

      <div class="row total">
        <span>TOTAL SALES:</span>
        <span>₱${reading.totalSales.toFixed(2)}</span>
      </div>

      <div class="thick-divider"></div>

      <div class="section-title">CASH RECONCILIATION</div>
      <div class="row">
        <span>Expected Cash:</span>
        <span>₱${reading.expectedCash.toFixed(2)}</span>
      </div>
      <div class="row">
        <span>Actual Cash:</span>
        <span>₱${reading.closingCash.toFixed(2)}</span>
      </div>
      <div class="row bold variance">
        <span>Variance:</span>
        <span>₱${reading.variance.toFixed(2)} ${
    reading.variance >= 0 ? "(Over)" : "(Short)"
  }</span>
      </div>

      <div class="thick-divider"></div>

      <p style="text-align: center; font-size: 12px; margin-top: 20px;">
        END OF DAY REPORT - ${reading.date.toLocaleDateString()}
      </p>
      <p style="text-align: center; font-size: 10px; margin-top: 10px;">
        This is a computer-generated report
      </p>

      <div style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="padding: 10px 30px; font-size: 14px; cursor: pointer;">
          Print Report
        </button>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
