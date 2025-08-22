import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  SearchIcon,
  XIcon,
} from "lucide-react";
import React, { JSX, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DrawerClose } from "../ui/drawer";

const formCategories = [
  {
    id: "commercial",
    name: "Commercial Forms",
    isExpanded: true,
    forms: [
      {
        id: "oc-5",
        name: "Commercial Contract - Optional Clauses (OC-5)",
        pages: "3 pages",
        checked: false,
      },
      {
        id: "cc-6",
        name: "Commercial Contract_CC-6",
        pages: "8 pages",
        checked: true,
      },
      {
        id: "cna-1",
        name: "Confidentiality and Non-Disclosure Agreement (CNA-1)",
        pages: "1 page",
        checked: false,
      },
      {
        id: "ds-5",
        name: "Designated Sales Associate (DS-5)",
        pages: "1 page",
        checked: false,
      },
      {
        id: "er-commercial",
        name: "Exclusive Right of Sale Listing Agreement Commercial ER...",
        pages: "4 pages",
        checked: false,
      },
      {
        id: "erlc-1x",
        name: "Exclusive Right to Lease - Commercial_ERLC-1x",
        pages: "3 pages",
        checked: false,
      },
      {
        id: "et-commercial",
        name: "Exclusive Tenant Brokerage Agreement - Commercial_ET...",
        pages: "3 pages",
        checked: false,
      },
      {
        id: "vac-14",
        name: "Vacant Land Contract_VAC-14xxxx",
        pages: "8 pages",
        checked: true,
      },
    ],
  },
  {
    id: "disclosures",
    name: "Disclosures",
    isExpanded: false,
    forms: [],
  },
  {
    id: "escrow",
    name: "Escrow forms",
    isExpanded: false,
    forms: [],
  },
  {
    id: "mars",
    name: "Mars forms",
    isExpanded: false,
    forms: [],
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    isExpanded: false,
    forms: [],
  },
  {
    id: "leases",
    name: "Leases and contract",
    isExpanded: false,
    forms: [],
  },
];

export const AdditionalInformationSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("FAR");
  const [categories, setCategories] = useState(formCategories);
  const [selectedCount, setSelectedCount] = useState(2);

  const toggleCategory = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, isExpanded: !cat.isExpanded } : cat,
      ),
    );
  };

  const toggleFormCheck = (categoryId: string, formId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              forms: cat.forms.map((form) =>
                form.id === formId ? { ...form, checked: !form.checked } : form,
              ),
            }
          : cat,
      ),
    );
  };

  return (
    <div className="w-full h-full py-10 bg-white rounded-lg border border-zinc-200 overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0">
      <div className="flex h-full">
        {/* Left Panel - Form Selection */}
        <div className="flex flex-col w-[640px] p-4 border-r border-zinc-200">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="text-2xl font-semibold text-zinc-900 [font-family:'Geist',Helvetica]">
              Select Forms
            </h1>

            <div className="relative w-60">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="SearchIcon forms..."
                className="pl-10 h-10 [font-family:'Geist',Helvetica]"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-fit"
            >
              <TabsList className="bg-zinc-100 p-1">
                <TabsTrigger
                  value="FAR"
                  className="w-[156px] data-[state=active]:bg-white data-[state=active]:shadow-sm [font-family:'Geist',Helvetica] font-medium"
                >
                  FAR
                </TabsTrigger>
                <TabsTrigger
                  value="NABOR MLS"
                  className="w-[156px] data-[state=active]:bg-white data-[state=active]:shadow-sm [font-family:'Geist',Helvetica] font-medium text-zinc-500"
                >
                  NABOR MLS
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Form Categories */}
          <div className="flex-1 space-y-4 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            {categories.map((category, index) => (
              <Collapsible
                key={category.id}
                open={category.isExpanded}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger className="flex items-center gap-3 w-full text-left p-0 hover:opacity-70 transition-opacity">
                  {category.isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4 text-zinc-600" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-zinc-600" />
                  )}
                  <FolderIcon className="h-6 w-6 text-zinc-600" />
                  <span className="text-lg font-medium text-zinc-900 [font-family:'Geist',Helvetica]">
                    {category.name}
                  </span>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-4">
                  {category.forms.length > 0 && (
                    <div className="border border-zinc-200 rounded-md">
                      {category.forms.map((form, formIndex) => (
                        <div
                          key={form.id}
                          className={`flex items-center justify-between p-4 ${
                            formIndex < category.forms.length - 1
                              ? "border-b border-zinc-200"
                              : ""
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={form.checked}
                              onCheckedChange={() =>
                                toggleFormCheck(category.id, form.id)
                              }
                              className="border-zinc-900"
                            />
                            <span className="text-sm text-zinc-900 [font-family:'Geist',Helvetica]">
                              {form.name}
                            </span>
                          </div>
                          <span className="text-sm text-zinc-500 [font-family:'Geist',Helvetica]">
                            {form.pages}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center gap-4 mt-6 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
            <Button
              variant="outline"
              className="h-10 px-6 [font-family:'Geist',Helvetica] font-medium"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back
            </Button>
             <DrawerClose asChild>
            <Button className="h-10 px-6 bg-zinc-900 cursor-pointer hover:bg-zinc-800 [font-family:'Geist',Helvetica] font-medium">
              Select ({selectedCount})
            </Button>
      </DrawerClose>
          </div>
        </div>

        {/* Right Panel - Form Preview */}
        <div className="flex-1 bg-zinc-100 relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
          {/* Header */}
          <div className="flex items-start justify-between p-4 bg-zinc-100">
            <div className="flex flex-col gap-1">
              <h2 className="text-[21px] font-semibold text-zinc-950 [font-family:'Geist',Helvetica]">
                Commercial Contract_CC-6
              </h2>
              <div className="flex items-center gap-2">
                <FolderIcon className="h-6 w-6 text-zinc-500" />
                <span className="text-lg font-medium text-zinc-500 [font-family:'Geist',Helvetica]">
                  Commercial Forms
                </span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
              <XIcon className="h-6 w-6" />
            </Button>
          </div>

          {/* Form Preview */}
          <div className="p-4">
            <img
              className="w-full h-[819px] object-cover rounded border border-zinc-200"
              alt="Form preview"
              src="https://c.animaapp.com/memfmv4yWYYveo/img/rectangle-5.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
