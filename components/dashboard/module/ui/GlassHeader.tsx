import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Home,
  MapPin,
  Phone,
  Mail,
  Star
} from 'lucide-react';

interface GlassHeaderProps {
  address: string;
  district: string;
  status: string;
}

const GlassHeader: React.FC<GlassHeaderProps> = ({
  address,
  district,
  status
}) => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/95 via-white/90 to-white/80 backdrop-blur-xl border border-white/30 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-300">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/20 opacity-60"></div>
        
        {/* Content */}
        <div className="relative p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Left: Property Info */}
          <div className="flex items-start md:items-center gap-6">
            {/* Icon Container */}
            <div className="relative group/icon">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl group-hover/icon:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700/50 shadow-lg group-hover/icon:shadow-xl group-hover/icon:scale-105 transition-all duration-300">
                <Home className="h-7 w-7 text-white" />
              </div>
            </div>
            
            {/* Property Details */}
            <div className="space-y-3">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                  {address}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  {/* Status Badge */}
                  <Badge className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-0 px-4 py-1.5 text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                    <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
                    {status}
                  </Badge>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center text-slate-600 group/location">
                <div className="flex items-center bg-slate-100/80 rounded-full px-3 py-1.5 group-hover/location:bg-slate-200/80 transition-colors duration-200">
                  <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                  <span className="text-sm font-medium">{district}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col xl:flex-row">
            <Button
              size="lg"
              variant="outline"
              className="group/btn bg-white/90 hover:bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 px-6 py-3"
            >
              <Phone className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
              <span className="font-semibold">Call Now</span>
            </Button>
            
            <Button
              size="lg"
              className="group/btn bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3"
            >
              <Mail className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-200" />
              <span className="font-semibold">Send Email</span>
            </Button>
          </div>
        </div>
        
        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-500/30 via-gray-500/30 to-slate-500/30"></div>
      </div>
    </div>
  );
};

export default GlassHeader;