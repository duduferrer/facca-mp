// Função para calcular o checksum CRC16
const calculateCRC16 = (payload: string): string => {
  const polynomial = 0x1021; // Polinômio CRC-16-CCITT
  let crc = 0xffff; // Valor inicial do CRC

  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8; // XOR do byte mais significativo
    for (let j = 0; j < 8; j++) {
      // Processa cada bit do byte
      if (crc & 0x8000) {
        crc = (crc << 1) ^ polynomial; // Aplica o polinômio se o bit mais à esquerda for 1
      } else {
        crc <<= 1; // Apenas desloca o CRC
      }
    }
  }

  // Garante que o CRC tenha 16 bits e o retorna como string hexadecimal
  return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
};

function formatLength(value: string): string {
  return value.toString().length.toString().padStart(2, "0");
}

const generatePixUrl = ({
  key,
  name,
  city,
  amount,
  transactionId,
}: {
  key: string; // Chave Pix (e-mail, telefone, CPF, ou chave aleatória)
  name: string; // Nome do recebedor
  city: string; // Cidade do recebedor
  amount: string; // Valor (formato: "12.34")
  transactionId?: string; // ID da transação (opcional)
}): string => {
  const formatIndicatorAndPointOfInitMethod = "000201"; // Payload Format Indicator
  const paymentSysIdentifier = "0014BR.GOV.BCB.PIX01";
  const merchantAccInfo = `26${key.length + 2 + paymentSysIdentifier.length}${paymentSysIdentifier}`;
  const keyInfo = `${formatLength(key)}${key}`;
  const categoryCode = "52040000";
  const currency = "5303986"; //BRL
  const transactionAmount = `54${formatLength(amount)}${amount}`;
  const countryCode = "5802BR";
  const merchantName = `59${formatLength(name)}${name}`;
  const merchantCity = `60${formatLength(city)}${city}`;
  const txid = `${transactionId ? `05${formatLength(transactionId)}${transactionId}` : ""}`;
  const additionalDataField = `62${formatLength(txid)}`;
  const crc16ID = "6304";
  const payload = `${formatIndicatorAndPointOfInitMethod}${merchantAccInfo}${keyInfo}${categoryCode}${currency}${transactionAmount}${countryCode}${merchantName}${merchantCity}${additionalDataField}${txid}${crc16ID}`;
  const crc16 = calculateCRC16(payload); // Gera o CRC16 para o payload

  return `${payload}${crc16}`; // Adiciona o CRC16 ao final
};

export const generatePixMP = (amount: string, transactionId: string) => {
  const key = process.env.NEXT_PUBLIC_PIX_KEY;
  let name = process.env.NEXT_PUBLIC_PIX_NAME;
  const city = process.env.NEXT_PUBLIC_PIX_CITY;
  let amountAbs = ""
  if(Number(amount) < 0){
   amountAbs = String(Number(amount)*-1) 
  }else{
    amountAbs = String(amount)
  }
  if (!key || !name || !city) {
    throw new Error("PIX parameters invalid");
  } else {
    if (name?.length > 25) {
      name = name.slice(0, 24);
    }
    if (Number(amount) != 0 && transactionId) {
      return generatePixUrl({ key, name, city, amountAbs, transactionId });
    } else {
      return "Não existem débitos no market place.";
    }
      
  }
};
