"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Calendar1Icon, ChevronDown, ChevronUp } from "lucide-react";

export default function RealEstateForm() {
  const [showAdditional, setShowAdditional] = useState(false);
  const [dates, setDates] = useState<any>({});

  // Updated DateField
  const DateField = ({ name }: any) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`w-full justify-between font-normal ${
            !dates[name] ? "text-muted-foreground" : ""
          }`}
        >
          {dates[name] ? format(dates[name], "PPP") : <span>Select date</span>}
          <Calendar1Icon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Calendar
          mode="single"
          selected={dates[name]}
          onSelect={(date) => {
            setDates({ ...dates, [name]: date });
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );

  const renderInput = (label: any, name: any, type = "text") => (
    <div>
      <Label  className="mb-2">{label}</Label>
      <Input type={type} name={name} />
    </div>
  );

  const renderSelect = (label: any, options: any) => (
    <div className="w-full">
      <Label>{label}</Label>
      <Select>
        <SelectTrigger className="w-full my-2">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: any) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <div className="p-4 mx-auto">
      <div className='flex mb-6 text-2xl font-semibold'>
  <h2>New Transcation</h2>
</div>
      <CardContent className="space-y-4">
        {/* Top row */}
        <div className="grid grid-cols-3 gap-4">
          {renderSelect("Type", ["Short sale", "Other"])}
          {renderSelect("Status", ["Pending", "Closed"])}
          {renderSelect("Representing", ["Buyer", "Seller"])}
        </div>

        {/* Address */}
        <div className="grid grid-cols-4 gap-4">
          {renderInput("Address", "address")}
          {renderInput("City", "city")}
          {renderInput("State", "state")}
          {renderInput("Zip", "zip")}
        </div>

        {/* Transaction details */}
        <div className="grid grid-cols-2 gap-4">
          {renderInput("Transaction name", "transaction")}
          {renderInput("Price", "price")}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-3 gap-4 ">
          <div>
            <Label className="mb-3">Buyer agreement date</Label>
            <DateField name="buyerAgreement" />
          </div>
          <div>
            <Label  className="mb-3">Buyer expiration date</Label>
            <DateField name="buyerExpiration" />
          </div>
          <div>
            <Label  className="mb-3">Acceptance date</Label>
            <DateField name="acceptance" />
          </div>
          <div>
            <Label  className="mb-3">Listing date</Label>
            <DateField name="listing" />
          </div>
          <div>
            <Label  className="mb-3">Listing expiration date</Label>
            <DateField name="listingExpiration" />
          </div>
          <div>
            <Label  className="mb-3">Closing date</Label>
            <DateField name="closing" />
          </div>
        </div>

        {/* Additional Fields Toggle */}
        <div>
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => setShowAdditional(!showAdditional)}
          >
            Additional fields {showAdditional ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>

        {/* Additional Fields */}
        {showAdditional && (
          <div className="grid grid-cols-3 gap-4">
            {renderInput("MLS #", "mls")}
            {renderSelect("Lead Source", ["Online", "Agent", "Referral"])}
            {renderInput("County", "county")}
            {renderSelect("Property type", ["Commercial", "Residential"])}
            {renderInput("Area", "area")}
            {renderInput("Public remarks", "publicRemarks")}
            {renderInput("Building SQFT", "buildingSqft")}
            {renderInput("Lot SQFT", "lotSqft")}
            {renderInput("Zoning", "zoning")}
            {renderInput("Bedrooms", "bedrooms")}
            {renderInput("Full baths", "fullBaths")}
            {renderInput("Half baths", "halfBaths")}
            {renderInput("Showing instructions", "showingInstructions")}
            {renderSelect("Show appt", ["Yes", "No"])}
            {renderInput("Description", "description")}
            {renderInput("Legal Description", "legalDescription")}
            {renderInput("APN", "apn")}
            {renderInput("SQFT", "sqft")}
            {renderInput("Tenant", "tenant")}
            {renderSelect("Lockbox", ["Yes", "No"])}
            {renderSelect("Yard sign", ["Yes", "No"])}
            {renderInput("Escrow #", "escrow")}
            {renderInput("Monies received from", "moniesReceivedFrom")}
            {renderInput("Amount received", "amountReceived")}
            <div>
              <Label  className="mb-3">Date received</Label>
              <DateField name="dateReceived" />
            </div>
            <div>
              <Label  className="mb-3">Date deposited</Label>
              <DateField name="dateDeposited" />
            </div>
            <div>
              <Label  className="mb-3">Date released</Label>
              <DateField name="dateReleased" />
            </div>
            {renderInput("Amount released", "amountReleased")}
          </div>
        )}
      </CardContent>
    </div>
  );
}
