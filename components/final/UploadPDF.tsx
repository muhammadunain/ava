import { uploadPDFMain } from "@/lib/actions/addpdf.action";
import { FileMeta } from "@/types";
import { useState } from "react";
import { OnboardingLayout } from "../loading/onboarding";
import PropertyProcessingLoader from "../loading/loading";
import { AnalysisResults } from "../loading/analized";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Loader2, X, ChevronDown, ChevronRight, Calendar, FileText, CheckCircle, Clock, Users, AlertTriangle } from "lucide-react";
import { SideSelection } from "../loading/side-section";
import { UploadArea } from "../loading/uploadarea";
import { OnboardingSteps } from "../loading/onstep";
import Link from "next/link";
import ContractSummaryCard from "../dialog/onboard";

const TransactionModalComponent = () => {
  const [selectedSide, setSelectedSide] = useState('Both');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileMeta, setFileMeta] = useState<FileMeta | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // New state for preview
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [expandedAccordion, setExpandedAccordion] = useState('accordion');
  const [showOptions, setShowOptions] = useState(true);
  const [showContractIntake, setShowContractIntake] = useState(false);
  const [previewExpanded, setPreviewExpanded] = useState<string>(''); // For preview accordion

  // Static preview data
  const previewSections = [
    {
      id: 'accordion',
      title: 'Key Contract Details',
      icon: <FileText className="w-5 h-5" />,
      description: 'Important contract terms, conditions, and clauses',
      items: [
        'Property address and legal description',
        'Purchase price and financing terms',
        'Contingencies and conditions',
        'Closing date and possession details'
      ]
    },
    {
      id: 'timeline',
      title: 'Transaction Timeline',
      icon: <Calendar className="w-5 h-5" />,
      description: 'Key dates and milestones throughout the transaction',
      items: [
        'Contract effective date',
        'Inspection period deadlines',
        'Financing contingency dates',
        'Closing and possession timeline'
      ]
    },
    {
      id: 'tasks',
      title: 'Action Items & Tasks',
      icon: <CheckCircle className="w-5 h-5" />,
      description: 'Tasks that need to be completed for successful closing',
      items: [
        'Schedule home inspection',
        'Submit loan application',
        'Review title commitment',
        'Coordinate closing arrangements'
      ]
    },
    {
      id: 'deadlines',
      title: 'Critical Deadlines',
      icon: <AlertTriangle className="w-5 h-5" />,
      description: 'Time-sensitive deadlines that cannot be missed',
      items: [
        'Inspection objection deadline',
        'Loan approval deadline',
        'Final walkthrough date',
        'Closing deadline'
      ]
    },
    {
      id: 'tables',
      title: 'Financial Summary',
      icon: <Users className="w-5 h-5" />,
      description: 'Financial breakdowns and cost summaries',
      items: [
        'Purchase price breakdown',
        'Closing cost estimates',
        'Earnest money details',
        'Commission structure'
      ]
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.size <= 25 * 1024 * 1024) {
      setUploadedFile(file);
      setFileMeta({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      });
      
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileMeta(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const resetModalState = () => {
    setShowOnboarding(false);
    setShowPreview(false);
    setShowOptions(true);
    setShowContractIntake(false);
    setCurrentStep(1);
    setResult(null);
    setLoading(false);
    setUploadedFile(null);
    setFileMeta(null);
    setSelectedSide('Both');
    setExpandedAccordion('accordion');
    setPreviewExpanded('');
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  const handleModalClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetModalState();
    }
  };

  const handleShowPreview = () => {
    if (!uploadedFile) return;
    setShowContractIntake(false);
    setShowPreview(true);
  };

  const handleStartAnalysis = async () => {
    if (!uploadedFile) return;
    
    setLoading(true);
    setShowPreview(false);
    setShowOnboarding(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('pdf', uploadedFile);
      const res = await uploadPDFMain(formData);
      
      if (res.success) {
        setResult(res.structuredData);
        console.log('Success:', res.structuredData);
      } else {
        console.error('Processing failed:', res.error);
        alert(`Error processing the PDF: ${res.error}`);
        setResult(res.structuredData);
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Error processing the PDF');
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (section: string) => {
    setExpandedAccordion(expandedAccordion === section ? '' : section);
  };

  const togglePreviewAccordion = (section: string) => {
    setPreviewExpanded(previewExpanded === section ? '' : section);
  };

  const handleCreateNewTransaction = () => {
    console.log("Navigate to onboarding page");
    setIsOpen(false);
    resetModalState();
  };

  const handleContractIntake = () => {
    setShowOptions(false);
    setShowContractIntake(true);
  };

  const handleBackToOptions = () => {
    setShowOptions(true);
    setShowContractIntake(false);
    setShowPreview(false);
  };

  const handleBackToUpload = () => {
    setShowPreview(false);
    setShowContractIntake(true);
  };

  const handleOnboardingComplete = () => {
    resetModalState();
    setIsOpen(false);
  };

  const handleBackToUploadFromOnboarding = () => {
    setShowOnboarding(false);
    setCurrentStep(1);
    setResult(null);
  };

  // Preview screen
  if (showPreview) {
    return (
      <OnboardingLayout pdfUrl={pdfUrl} fileMeta={fileMeta} currentStep={0}>
      <ContractSummaryCard/>
       <div className="flex justify-between items-center my-5">
            <Button className="cursor-pointer" onClick={handleBackToUpload} variant="outline">
              Back to Upload
            </Button>
            
            <Button
              onClick={handleStartAnalysis}
             className="bg-black cursor-pointer text-white hover:bg-black/80"
            >
              Extract Remaining Details
            </Button>
          </div>
      </OnboardingLayout>
    );
  }

  // Full screen onboarding view
  if (showOnboarding) {
    return (
      <OnboardingLayout pdfUrl={pdfUrl} fileMeta={fileMeta} currentStep={currentStep}>
        {loading ? (
          <PropertyProcessingLoader />
        ) : result ? (
          <>
            {currentStep === 1 && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Transaction Details</h2>
                  <p className="text-gray-600 text-xs">
                    Take a look a moment to review the key details I pulled from your document.
                    You can make any edits before we finalize your life.
                  </p>
                </div>

                <AnalysisResults 
                  result={result} 
                  expandedAccordion={expandedAccordion} 
                  onToggleAccordion={toggleAccordion} 
                />

                <div className="mt-8 flex justify-between">
                  <Button onClick={handleBackToUploadFromOnboarding} variant="outline">
                    Back to Upload
                  </Button>
                  <Button onClick={() => setCurrentStep(2)} className="cursor-pointer">
                    Let's Review
                  </Button>
                </div>
              </>
            )}

            {currentStep > 1 && (
              <OnboardingSteps 
                result={result}
                currentStep={currentStep}
                onStepChange={setCurrentStep}
                onComplete={handleOnboardingComplete}
                expandedAccordion={expandedAccordion}
                onToggleAccordion={toggleAccordion}
              />
            )}
          </>
        ) : null}
      </OnboardingLayout>
    );
  }

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="bg-gray-900 cursor-pointer hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
          >
            <span className="text-lg">+</span>
            <span>New Transaction</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-lg mx-auto bg-white rounded-xl shadow-xl border-0 p-0 overflow-hidden">
          {showOptions && (
            <>
              <DialogHeader className="p-6 pb-4 ">
                <DialogTitle className="text-xl font-bold text-gray-900">
                  Select How to Proceed
                </DialogTitle>
                <p className="text-gray-600 text-sm mt-1">
                  How would you like to create your document?
                </p>
              </DialogHeader>

              <div className="px-6 pb-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Link href={'/onboarding'}>
                    <div
                      onClick={handleCreateNewTransaction}
                      className="border-2 border-blue-300  bg-blue-50 rounded-md p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">Create New Transaction</h3>
                      <p className="text-gray-600 text-sm">We will set you up from contract to execution</p>
                    </div>
                  </Link>

                  <div
                    onClick={handleContractIntake}
                    className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">Contract Intake</h3>
                    <p className="text-gray-600 text-sm">Already have a file? Upload the file and we will set it up</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleCreateNewTransaction}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2  font-medium flex items-center gap-2"
                  >
                    Next
                    <span className="text-sm">→</span>
                  </Button>
                </div>
              </div>
            </>
          )}

          {showContractIntake && (
            <>
              <DialogHeader className="p-6 pb-4 relative">
                <DialogTitle className="text-xl font-semibold text-gray-900 pr-8">
                  Welcome back, Dave! Ready for your next transaction?
                </DialogTitle>
              </DialogHeader>

              <div className="px-6 pb-6 space-y-6">
                <SideSelection selectedSide={selectedSide} onSideChange={setSelectedSide} />
                <UploadArea onFileUpload={handleFileUpload} fileMeta={fileMeta} onRemoveFile={removeFile} />

                <div className="flex justify-between items-center">
                  <Button
                    onClick={handleBackToOptions}
                    variant="outline"
                    className="text-gray-600 cursor-pointer border-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </Button>

                  <Button
                    onClick={handleShowPreview}
                    disabled={!uploadedFile}
                   className="cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    Start Intake
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TransactionModalComponent;