"use client";

 import { useState } from 'react';
 import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
 } from '@/components/ui/dialog';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { Input } from '@/components/ui/input';
 import { Button } from '@/components/ui/button';
 import { Card } from '@/components/ui/card';
 import { ScrollArea } from "@/components/ui/scroll-area";
import { Crown, Sparkles, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

 interface CreditBundle {
  credits: number;
  price: number;
  original: number;
  discount: string;
 }

 const bundles: CreditBundle[] = [
  { credits: 1000, price: 9.99, original: 12.99, discount: "Save 23%" },
  { credits: 2500, price: 22.99, original: 29.99, discount: "Save 23%" },
  { credits: 5000, price: 39.99, original: 54.99, discount: "Save 27%" },
  { credits: 10000, price: 69.99, original: 99.99, discount: "Save 30%" },
  { credits: 15000, price: 99.99, original: 149.99, discount: "Save 33%" },
 ];

 interface GetCreditsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
 }

 export function GetCreditsDialog({ isOpen, onOpenChange }: GetCreditsDialogProps) {
  const [amount, setAmount] = useState<number |null>();

  return (
<Dialog open={isOpen} onOpenChange={onOpenChange}>
<DialogContent
  className="w-full max-w-3xl  lg:max-w-2xl rounded-3xl border border-amber-100/50 bg-gradient-to-br from-stone-50/95 via-amber-50/90 to-orange-50/85 backdrop-blur-xl shadow-2xl p-0 overflow-hidden mx-auto"
>
    
    {/* Decorative wood pattern overlay */}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml,%3Csvg width=\\'60\\' height=\\'60\\' viewBox=\\'0 0 60 60\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cg fill=\\'none\\' fill-rule=\\'evenodd\\'%3E%3Cg fill=\\'%23d2691e\\' fill-opacity=\\'1\\'%3E%3Cpath d=\\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

    {/* Gradient border ring */}
    <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-amber-200/20 via-orange-200/20 to-amber-200/20 pointer-events-none">
      <div className="h-full w-full rounded-3xl bg-gradient-to-br from-stone-50/95 via-amber-50/90 to-orange-50/85" />
    </div>

    <div className="relative p-8">
      <DialogHeader className="mb-8">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/50">
            <Sparkles className="w-6 h-6 text-amber-600" />
          </div>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-amber-800 via-orange-700 to-amber-700 bg-clip-text text-transparent">
            Get More Credits
          </DialogTitle>
        </div>
        <p className="text-center text-stone-600 font-medium">
          Power up your experience with premium credit packages
        </p>
      </DialogHeader>

      <Tabs defaultValue="discounted" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 mb-8 border border-amber-200/30 shadow-inner">
          {["custom", "discounted"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-50 data-[state=active]:to-orange-50 data-[state=active]:shadow-md data-[state=active]:border data-[state=active]:border-amber-200/50 rounded-xl font-semibold text-stone-700 data-[state=active]:text-amber-800 transition-all duration-300"
            >
              {tab === "custom" ? "Custom Amount" : "Discounted Bundles"}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Custom Credit Amount */}
        <TabsContent value="custom" className="space-y-6 mt-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/30 shadow-lg">
            <label className="block text-sm font-semibold text-stone-700 mb-3">
              Credit Amount
            </label>
            <Input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              placeholder="Enter amount to buy"
              className="bg-white/80 backdrop-blur-sm border-2 border-amber-200/50 focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:border-amber-400 rounded-xl h-12 text-stone-800 placeholder:text-stone-500 font-medium shadow-sm"
            />
            <div className="flex justify-end gap-4 mt-6">
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
                className="hover:bg-stone-100/80 text-stone-600 font-semibold px-6 rounded-xl"
              >
                Cancel
              </Button>
              <Button className="bg-gradient-to-r cursor-pointer from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Buy Credits
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Discounted Bundles */}
        <TabsContent value="discounted" className="overflow-y-auto max-h-[300px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bundles.map(({ credits, price, original, discount, popular, bestValue }:any) => (
              <Card
                key={credits}
                className={`group relative rounded-2xl border-2 bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer overflow-hidden
                  ${popular 
                    ? 'border-amber-300/60 bg-gradient-to-br from-amber-50/90 to-orange-50/80' 
                    : bestValue
                    ? 'border-orange-300/60 bg-gradient-to-br from-orange-50/90 to-amber-50/80'
                    : 'border-stone-200/60 hover:border-amber-200/80'
                  }`}
              >
                {(popular || bestValue) && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <Badge className={`bg-gradient-to-r ${popular ? 'from-amber-500 to-orange-500' : 'from-orange-500 to-red-500'} text-white font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white`}>
                      {popular ? <Crown className="w-3 h-3 mr-1" /> : <Star className="w-3 h-3 mr-1" />}
                      {popular ? "POPULAR" : "BEST VALUE"}
                    </Badge>
                  </div>
                )}

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/0 via-orange-400/0 to-amber-400/0 group-hover:from-amber-400/10 group-hover:via-orange-400/10 group-hover:to-amber-400/10 transition-all duration-500"></div>

                <div className="relative p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold px-3 py-1 rounded-full shadow-md">
                      {discount}
                    </Badge>
                    <div className="text-right text-sm text-stone-500 line-through font-medium">
                      ${original.toFixed(2)}
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent mb-2">
                      ${price.toFixed(2)}
                    </div>
                    <div className="text-lg font-semibold text-stone-700 flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      {credits.toLocaleString()} Credits
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-xs font-medium text-stone-600 bg-stone-100/80 px-3 py-1 rounded-full">
                      ${(price / credits * 100).toFixed(1)} per 100 credits
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-amber-50/50 backdrop-blur-sm rounded-xl border border-amber-200/30">
            <p className="text-sm text-stone-600 text-center font-medium">
              💳 Secure payment • ⚡ Instant delivery • 🔄 30-day money-back guarantee
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </DialogContent>
</Dialog>

  );
 }