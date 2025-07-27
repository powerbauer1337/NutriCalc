# Component Library Structure Diagram

```mermaid
graph TD
    A[Component Library] --> B[Foundational]
    A --> C[Layout]
    A --> D[Input]
    A --> E[Data Display]
    A --> F[Feedback]
    A --> G[Navigation]
    A --> H[Form]
    
    B --> B1[Design Tokens]
    B --> B2[Utility Functions]
    
    C --> C1[Grid System]
    C --> C2[Container]
    C --> C3[Card System]
    C --> C4[Responsive Layout]
    
    D --> D1[Form Controls]
    D --> D2[Buttons]
    D --> D3[Checkbox/Radio]
    D --> D4[Slider]
    D --> D5[Toggle Switch]
    
    E --> E1[Tables]
    E --> E2[Lists]
    E --> E3[Charts/Graphs]
    E --> E4[Badges]
    E --> E5[Progress Indicators]
    
    F --> F1[Toasts/Notifications]
    F --> F2[Modals/Dialogs]
    F --> F3[Alerts]
    F --> F4[Loading Indicators]
    
    G --> G1[Navigation]
    G --> G2[Breadcrumbs]
    G --> G3[Tabs]
    G --> G4[Pagination]
    
    H --> H1[Form Layout]
    H --> H2[Form Validation]
    H --> H3[Error Messaging]
    H --> H4[Field Groups]