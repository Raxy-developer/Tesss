import React, { useState, useEffect } from 'react';
import { Play, Square, Wifi, WifiOff, MessageSquare, Settings, Copy, Check } from 'lucide-react';

export default function WhatsAppBotDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingCode, setPairingCode] = useState('');
  const [logs, setLogs] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [copied, setCopied] = useState(false);

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, type, timestamp }].slice(-50));
  };

  const generatePairingCode = () => {
    // Simulasi generate pairing code
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setPairingCode(code);
    addLog(`Pairing code generated: ${code}`, 'success');
    addLog('Masukkan kode ini di WhatsApp: Pengaturan > Perangkat Tertaut > Tautkan Perangkat > Tautkan dengan Nomor Telepon', 'info');
  };

  const startBot = () => {
    if (!phoneNumber) {
      addLog('Masukkan nomor telepon terlebih dahulu!', 'error');
      return;
    }

    setIsRunning(true);
    addLog('Memulai bot WhatsApp...', 'info');
    
    // Simulasi proses koneksi
    setTimeout(() => {
      generatePairingCode();
    }, 1000);

    // Simulasi koneksi berhasil
    setTimeout(() => {
      setIsConnected(true);
      addLog('Bot berhasil terhubung ke WhatsApp!', 'success');
      addLog(`Nomor aktif: ${phoneNumber}`, 'success');
    }, 5000);
  };

  const stopBot = () => {
    setIsRunning(false);
    setIsConnected(false);
    setPairingCode('');
    addLog('Bot dihentikan', 'warning');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(pairingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulasi menerima pesan
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        setMessageCount(prev => prev + 1);
        const sampleMessages = [
          'Pesan diterima dari: +62812345678',
          'Auto reply terkirim',
          'Command diproses: !help',
          'Pesan grup diterima'
        ];
        addLog(sampleMessages[Math.floor(Math.random() * sampleMessages.length)], 'info');
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <MessageSquare className="text-green-600" size={36} />
                WhatsApp Bot Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Kelola bot WhatsApp dengan pairing code</p>
            </div>
            <div className="flex items-center gap-3">
              {isConnected ? (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                  <Wifi size={20} />
                  <span className="font-semibold">Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-4 py-2 rounded-lg">
                  <WifiOff size={20} />
                  <span className="font-semibold">Disconnected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Settings size={24} />
                Kontrol Bot
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    placeholder="628123456789"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isRunning}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: 628xxx (tanpa +)</p>
                </div>

                {pairingCode && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pairing Code
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 text-2xl font-mono font-bold text-green-700 tracking-wider">
                        {pairingCode}
                      </div>
                      <button
                        onClick={copyCode}
                        className="p-2 hover:bg-green-100 rounded-lg transition-colors"
                      >
                        {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} className="text-gray-600" />}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      Masukkan kode ini di WhatsApp Anda
                    </p>
                  </div>
                )}

                <div className="pt-4 space-y-3">
                  {!isRunning ? (
                    <button
                      onClick={startBot}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Play size={20} />
                      Start Bot
                    </button>
                  ) : (
                    <button
                      onClick={stopBot}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <Square size={20} />
                      Stop Bot
                    </button>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Statistik</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pesan Diproses</span>
                    <span className="font-bold text-green-600">{messageCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-semibold ${isConnected ? 'text-green-600' : 'text-gray-500'}`}>
                      {isConnected ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Logs Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Activity Logs</h2>
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                  <div className="text-gray-500 text-center py-8">
                    Tidak ada log. Mulai bot untuk melihat aktivitas.
                  </div>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="mb-2">
                      <span className="text-gray-500">[{log.timestamp}]</span>
                      <span className={`ml-2 ${
                        log.type === 'error' ? 'text-red-400' :
                        log.type === 'success' ? 'text-green-400' :
                        log.type === 'warning' ? 'text-yellow-400' :
                        'text-gray-300'
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">📱 Cara Menggunakan</h3>
              <ol className="space-y-2 text-sm text-blue-800">
                <li>1. Masukkan nomor WhatsApp Anda (format: 628xxx)</li>
                <li>2. Klik tombol "Start Bot"</li>
                <li>3. Salin pairing code yang muncul</li>
                <li>4. Buka WhatsApp → Pengaturan → Perangkat Tertaut</li>
                <li>5. Pilih "Tautkan Perangkat" → "Tautkan dengan Nomor Telepon"</li>
                <li>6. Masukkan pairing code dan konfirmasi</li>
                <li>7. Bot akan otomatis terhubung!</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
