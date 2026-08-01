export interface LocalMessage {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  is_read: boolean;
  is_archived: boolean;
  admin_notes: string | null;
  created_at: string;
}

export interface LocalSubscriber {
  id: string;
  email: string;
  is_active: boolean;
  unsubscribed_at: string | null;
  created_at: string;
}

const MESSAGES_KEY = 'vortx_local_messages';
const NEWSLETTER_KEY = 'vortx_local_newsletter';

const defaultMessages: LocalMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@acme-corp.com',
    company: 'Acme Global',
    message: 'We are looking to rebuild our enterprise web platform with custom AI features. Would love to schedule an introductory consultation.',
    is_read: false,
    is_archived: false,
    admin_notes: null,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'msg-2',
    name: 'David Miller',
    email: 'd.miller@fintechlabs.io',
    company: 'FinTech Labs',
    message: 'Interested in your Cloud Infrastructure and Automation Systems services for our upcoming platform launch.',
    is_read: true,
    is_archived: false,
    admin_notes: 'Followed up via email on Thursday',
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

const defaultSubscribers: LocalSubscriber[] = [
  {
    id: 'sub-1',
    email: 'alex.rover@techcrunch.com',
    is_active: true,
    unsubscribed_at: null,
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'sub-2',
    email: 'contact@digitalhorizon.io',
    is_active: true,
    unsubscribed_at: null,
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

// Messages Helpers
export function getLocalMessages(): LocalMessage[] {
  try {
    const data = localStorage.getItem(MESSAGES_KEY);
    if (!data) {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(defaultMessages));
      return defaultMessages;
    }
    return JSON.parse(data);
  } catch {
    return defaultMessages;
  }
}

export function saveLocalMessage(data: { name: string; email: string; company?: string; message: string }): LocalMessage {
  const current = getLocalMessages();
  const newMsg: LocalMessage = {
    id: 'msg-' + Date.now(),
    name: data.name,
    email: data.email,
    company: data.company || null,
    message: data.message,
    is_read: false,
    is_archived: false,
    admin_notes: null,
    created_at: new Date().toISOString(),
  };
  const updated = [newMsg, ...current];
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  return newMsg;
}

export function updateLocalMessage(id: string, fields: Partial<LocalMessage>): LocalMessage[] {
  const current = getLocalMessages();
  const updated = current.map((m) => (m.id === id ? { ...m, ...fields } : m));
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteLocalMessage(id: string): LocalMessage[] {
  const current = getLocalMessages();
  const updated = current.filter((m) => m.id !== id);
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
  return updated;
}

// Newsletter Helpers
export function getLocalSubscribers(): LocalSubscriber[] {
  try {
    const data = localStorage.getItem(NEWSLETTER_KEY);
    if (!data) {
      localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(defaultSubscribers));
      return defaultSubscribers;
    }
    return JSON.parse(data);
  } catch {
    return defaultSubscribers;
  }
}

export function saveLocalSubscriber(email: string): { subscriber: LocalSubscriber; alreadySubscribed: boolean } {
  const current = getLocalSubscribers();
  const cleanEmail = email.trim().toLowerCase();
  const existing = current.find((s) => s.email === cleanEmail);

  if (existing) {
    if (existing.is_active) {
      return { subscriber: existing, alreadySubscribed: true };
    }
    const updated = current.map((s) =>
      s.email === cleanEmail ? { ...s, is_active: true, unsubscribed_at: null } : s
    );
    localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(updated));
    return { subscriber: { ...existing, is_active: true }, alreadySubscribed: false };
  }

  const newSub: LocalSubscriber = {
    id: 'sub-' + Date.now(),
    email: cleanEmail,
    is_active: true,
    unsubscribed_at: null,
    created_at: new Date().toISOString(),
  };
  const updated = [newSub, ...current];
  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(updated));
  return { subscriber: newSub, alreadySubscribed: false };
}

export function updateLocalSubscriber(id: string, fields: Partial<LocalSubscriber>): LocalSubscriber[] {
  const current = getLocalSubscribers();
  const updated = current.map((s) => (s.id === id ? { ...s, ...fields } : s));
  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteLocalSubscriber(id: string): LocalSubscriber[] {
  const current = getLocalSubscribers();
  const updated = current.filter((s) => s.id !== id);
  localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(updated));
  return updated;
}
