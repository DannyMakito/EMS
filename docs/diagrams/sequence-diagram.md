# 2) Sequence Diagram (How the system runs)

## A) Login → role fetch → routed dashboard

```mermaid
sequenceDiagram
autonumber
actor User
participant UI as AuthForm (React)
participant Auth as AuthContext
participant SB as Supabase Auth
participant DB as Supabase DB (permission)
participant PR as ProtectedRoute
participant Router as React Router

User->>UI: Enter email/password, click Sign In
UI->>Auth: signIn(email,password)
Auth->>SB: signInWithPassword()
SB-->>Auth: session + user
Auth->>DB: SELECT role FROM permission WHERE member_id=user.id
DB-->>Auth: role
Auth-->>UI: success + role
UI->>Router: navigate(/admin/* or /hr/* or /employee/*)
Router->>PR: render protected route
PR->>Auth: read {session,userRole,loading}
alt authenticated AND role allowed
  PR-->>Router: allow (layout + page renders)
else not authenticated
  PR-->>Router: Navigate("/")
else role not allowed
  PR-->>Router: Navigate(role-based dashboard)
end
```

## B) Admin creates member (Supabase Admin API + DB rows)

```mermaid
sequenceDiagram
autonumber
actor Admin
participant UI as CreateMember (React)
participant Auth as AuthContext.createMember()
participant SBA as Supabase Admin Auth
participant DB as Supabase DB

Admin->>UI: Fill member details, submit
UI->>Auth: createMember(email,password,name,role,status,gender,department)
Auth->>SBA: auth.admin.createUser(email,password,metadata)
SBA-->>Auth: user.id
Auth->>DB: INSERT member(id,email,name,gender,department)
DB-->>Auth: ok
Auth->>DB: INSERT permission(member_id,role,status)
DB-->>Auth: ok
Auth-->>UI: success
```

## C) Employee sends a chat message (DB insert + realtime receive)

```mermaid
sequenceDiagram
autonumber
actor Sender
actor Receiver
participant ChatUI as Chat (React)
participant SB as Supabase Client
participant DB as Supabase DB (messages)
participant RT as Supabase Realtime

Sender->>ChatUI: Type message, press Send
ChatUI->>SB: auth.getSession()/getUser (to identify sender)
SB-->>ChatUI: sender_id
ChatUI->>DB: INSERT messages(sender_id,receiver_id,content)
DB-->>ChatUI: inserted row
DB-->>RT: broadcast change event (realtime)
RT-->>ChatUI: new message event
RT-->>Receiver: new message event
Receiver-->>Receiver: UI updates with message
```

