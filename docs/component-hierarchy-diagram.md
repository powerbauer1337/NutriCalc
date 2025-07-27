# Component Hierarchy Diagram

```mermaid
graph TD
    A[Component Hierarchy] --> B[Atomic Components]
    A --> C[Molecular Components]
    A --> D[Organismic Components]
    A --> E[Template Components]
    A --> F[Page Components]
    
    B --> B1[Button]
    B --> B2[Input]
    B --> B3[Icon]
    B --> B4[Label]
    
    C --> C1[InputGroup]
    C --> C2[FormField]
    C --> C3[CardHeader]
    C --> C4[CardContent]
    C --> C5[CardFooter]
    
    D --> D1[Form]
    D --> D2[Card]
    D --> D3[Navigation]
    D --> D4[DataTable]
    
    E --> E1[PageLayout]
    E --> E2[DashboardTemplate]
    E --> E3[FormTemplate]
    
    F --> F1[HomePage]
    F --> F2[SetupPage]
    F --> F3[AnalysisPage]
    
    style B fill:#e3f2fd
    style C fill:#f3e5f5
    style D fill:#e8f5e8
    style E fill:#fff3e0
    style F fill:#fce4ec