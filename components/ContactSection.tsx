import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Users, Calculator, Building, ShoppingCart, Truck, FileText, MoreHorizontal, TableIcon, Grid3X3 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddContactModal from "./dialog/ContactDialog";

const contacts = [
  { name: "", email: "No email", phone: "No phone", type: "Other" },
  { name: "Jay Christopher Wagner", email: "No email", phone: "No phone", type: "Seller" },
  { name: "Jeff Eckert", email: "No email", phone: "No phone", type: "Buyer" },
  { name: "Josh Rudnick", email: "No email", phone: "(239) 325-4070", type: "Escrow Officer" },
  { name: "Kimberly Eckert", email: "No email", phone: "No phone", type: "Buyer" },
  { name: "Naples Homes", email: "No email", phone: "No phone", type: "Buyer Brokerage" },
  { name: "Naples Homes", email: "No email", phone: "No phone", type: "Seller Brokerage" },
  { name: "Ryan Schwartz", email: "No email", phone: "No phone", type: "Seller Agent" },
  { name: "Ryan Schwartz", email: "No email", phone: "No phone", type: "Buyer Agent" },
];

const agentContacts = [
  { name: "Ryan Schwartz", email: "ryan@naples.com", phone: "(239) 555-0101", type: "Seller Agent" },
  { name: "Maria Rodriguez", email: "maria@realty.com", phone: "(239) 555-0102", type: "Buyer Agent" },
];

const brokerageContacts = [
  { name: "Naples Homes", email: "info@napleshomes.com", phone: "(239) 555-0201", type: "Buyer Brokerage" },
  { name: "Sunshine Realty", email: "contact@sunshine.com", phone: "(239) 555-0202", type: "Seller Brokerage" },
];

const buyerSellerContacts = [
  { name: "Jeff Eckert", email: "jeff@email.com", phone: "(239) 555-0301", type: "Buyer" },
  { name: "Jay Christopher Wagner", email: "jay@email.com", phone: "(239) 555-0302", type: "Seller" },
];

const vendorContacts = [
  { name: "ABC Home Inspection", email: "info@abcinspection.com", phone: "(239) 555-0401", type: "Inspector" },
  { name: "Quality Appraisals", email: "contact@qualityapp.com", phone: "(239) 555-0402", type: "Appraiser" },
];

const tcContacts = [
  { name: "Sarah Johnson", email: "sarah@transactions.com", phone: "(239) 555-0501", type: "Transaction Coordinator" },
  { name: "Mike Thompson", email: "mike@tcpro.com", phone: "(239) 555-0502", type: "Transaction Coordinator" },
];

const otherContacts = [
  { name: "Josh Rudnick", email: "josh@escrow.com", phone: "(239) 325-4070", type: "Escrow Officer" },
  { name: "Lisa Chen", email: "lisa@title.com", phone: "(239) 555-0602", type: "Title Officer" },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Seller":
    case "Seller Agent":
    case "Seller Brokerage":
      return "bg-blue-100 text-blue-800";
    case "Buyer":
    case "Buyer Agent":
    case "Buyer Brokerage":
      return "bg-green-100 text-green-800";
    case "Escrow Officer":
    case "Title Officer":
      return "bg-orange-100 text-orange-800";
    case "Transaction Coordinator":
      return "bg-purple-100 text-purple-800";
    case "Inspector":
    case "Appraiser":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const renderContactTable = (contactList: typeof contacts) => (
  <div className="border rounded-lg">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Party</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Type</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contactList.map((contact, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm">{contact.name || "—"}</span>
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">{contact.email}</TableCell>
            <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
            <TableCell>
              <Badge variant="secondary" className={`text-xs ${getTypeColor(contact.type)}`}>
                {contact.type}
              </Badge>
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export function ContactsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">All Contacts</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <TableIcon className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button variant="ghost" size="sm">
              <Grid3X3 className="h-4 w-4 mr-2" />
              Cards
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search contacts..." 
              className="pl-10 w-80"
            />
          </div>
        <AddContactModal/>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Contacts
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Agents
          </TabsTrigger>
          <TabsTrigger value="brokerages" className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            Brokerages
          </TabsTrigger>
          <TabsTrigger value="buyers-sellers" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            Buyers/Sellers
          </TabsTrigger>
          <TabsTrigger value="vendors" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Vendors
          </TabsTrigger>
          <TabsTrigger value="tcs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            TCs
          </TabsTrigger>
          <TabsTrigger value="others" className="flex items-center gap-2">
            <MoreHorizontal className="h-4 w-4" />
            Others
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Party</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm">{contact.name || "—"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{contact.email}</TableCell>
                    <TableCell className="text-muted-foreground">{contact.phone}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`text-xs ${getTypeColor(contact.type)}`}>
                        {contact.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="agents" className="mt-6">
          {renderContactTable(agentContacts)}
        </TabsContent>
        
        <TabsContent value="brokerages" className="mt-6">
          {renderContactTable(brokerageContacts)}
        </TabsContent>
        
        <TabsContent value="buyers-sellers" className="mt-6">
          {renderContactTable(buyerSellerContacts)}
        </TabsContent>
        
        <TabsContent value="vendors" className="mt-6">
          {renderContactTable(vendorContacts)}
        </TabsContent>
        
        <TabsContent value="tcs" className="mt-6">
          {renderContactTable(tcContacts)}
        </TabsContent>
        
        <TabsContent value="others" className="mt-6">
          {renderContactTable(otherContacts)}
        </TabsContent>
      </Tabs>
    </div>
  );
}