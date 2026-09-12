import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { useAppContext } from '@/context/AppContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { QrCode, ExternalLink, Download, Copy, Check, ShieldCheck, UserCheck } from 'lucide-react';
import { BackButton } from './BackButton';

export const Header = ({ 
  compact = false, 
  title, 
  showBack = false 
}: { 
  compact?: boolean; 
  title?: string;
  showBack?: boolean;
}) => {
  const { artisan, language, setLanguage } = useAppContext();
  const navigate = useNavigate();
  const [showQR, setShowQR] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const sellerProfileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/seller/${artisan.id || 'artisan-1'}`
    : `/seller/${artisan.id || 'artisan-1'}`;

  useEffect(() => {
    if (showQR) {
      QRCode.toDataURL(sellerProfileUrl, {
        errorCorrectionLevel: 'H',
        margin: 2,
        width: 400,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      }).then(url => {
        setQrUrl(url);
      }).catch(err => {
        console.error('Error generating QR code in header:', err);
      });
    }
  }, [showQR, sellerProfileUrl]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(sellerProfileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `Artisan_${artisan.name.replace(/\s+/g, '_')}_ID_QR.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <div className="bg-white px-4 py-3 border-b sticky top-0 z-40 flex items-center justify-between shadow-xs">
        {compact ? (
          <div className="flex items-center gap-2.5">
            <BackButton />
            <h1 className="font-bold text-base text-slate-900 truncate">{title || (language === 'hi' ? 'वापस' : 'Back')}</h1>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {showBack && <BackButton className="mr-0.5" />}
            <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-xl text-orange-600 leading-tight">{artisan.name}</h1>
              <span className="inline-flex items-center text-emerald-600" title="Govt. GI Verified Artisan">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>
            <p className="text-xs text-gray-500">{artisan.craft} • {artisan.location}</p>
            <div className="flex gap-1 mt-1">
              {artisan.giCertified && <Badge variant="success" className="text-[10px] px-1 py-0 h-4">GI Tag</Badge>}
              {artisan.shgMember && <Badge variant="secondary" className="text-[10px] px-1 py-0 h-4">SHG</Badge>}
              <button 
                onClick={() => navigate(`/seller/${artisan.id || 'artisan-1'}`)}
                className="text-[10px] text-indigo-600 font-semibold hover:underline flex items-center gap-0.5 ml-1"
              >
                ID Profile <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        </div>
        )}
        
        <div className="flex items-center gap-2">
          {!compact && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8 px-2.5 rounded-lg border-indigo-200 text-indigo-700 bg-indigo-50/50 hover:bg-indigo-100 flex items-center gap-1 shadow-xs font-semibold text-xs transition-colors" 
              onClick={() => setShowQR(true)}
              title="Show Verified Artisan QR Code"
            >
              <QrCode className="w-3.5 h-3.5 text-indigo-600" />
              <span>QR ID</span>
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="text-xs font-medium"
          >
            {language === 'hi' ? 'A/अ' : 'अ/A'}
          </Button>
        </div>
      </div>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-sm mx-auto flex flex-col items-center p-6 text-center bg-white rounded-3xl shadow-2xl">
          <DialogHeader className="w-full text-center flex flex-col items-center">
            <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900">
              Verified Artisan ID QR
            </DialogTitle>
            <p className="text-xs text-slate-500 max-w-xs mt-0.5">
              Scan with any mobile camera to view the complete authentic seller ID profile.
            </p>
            <DialogClose onClick={() => setShowQR(false)} />
          </DialogHeader>

          {/* Real Scannable QR Code */}
          <div className="my-4 p-4 bg-slate-900 rounded-2xl border-2 border-amber-400/80 shadow-md">
            {qrUrl ? (
              <img 
                src={qrUrl} 
                alt="Artisan Profile Scannable QR" 
                className="w-48 h-48 bg-white rounded-xl p-2 mx-auto object-contain" 
              />
            ) : (
              <div className="w-48 h-48 bg-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400">
                Generating QR Code...
              </div>
            )}
            <div className="mt-2 text-[10px] font-mono text-amber-300 font-bold tracking-wider uppercase">
              {artisan.name} • {artisan.location}
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed mb-1">
            Scanning this QR opens the official <strong>Karigar Pehchan Patra</strong>, GI Tag credentials, artisan story, and verified product catalog.
          </p>

          <div className="w-full space-y-2 pt-2">
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold py-2.5 flex items-center justify-center gap-2"
              onClick={() => {
                setShowQR(false);
                navigate(`/seller/${artisan.id || 'artisan-1'}`);
              }}
            >
              <UserCheck className="w-4 h-4" />
              Open Complete Seller ID Profile
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline"
                className="text-xs rounded-xl flex items-center justify-center gap-1.5 border-slate-200"
                onClick={handleDownloadQr}
              >
                <Download className="w-3.5 h-3.5" /> Download QR
              </Button>
              <Button 
                variant="outline"
                className="text-xs rounded-xl flex items-center justify-center gap-1.5 border-slate-200"
                onClick={handleCopyLink}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Link'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
