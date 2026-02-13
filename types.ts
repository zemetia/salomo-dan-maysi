export type Language = "EN" | "ID";

export interface TranslationSet {
  hero: {
    title: string;
    inviteText: string;
    date: string;
  };
  couple: {
    title: string;
    theBride: string;
    theGroom: string;
    brideDesc: string;
    groomDesc: string;
  };
  gallery: {
    title: string;
    subtitle: string;
  };
  event: {
    ceremony: {
      title: string;
      date: string;
      time: string;
      venue: string;
      address: string;
      addCalendar: string;
      openMaps: string;
    };
    reception: {
      title: string;
      date: string;
      time: string;
      venue: string;
      address: string;
      addCalendar: string;
      openMaps: string;
    };
    transitText: string;
  };
  countdown: {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
    toBigDay: string;
  };
  video: {
    title: string;
    url: string; // Added url in case video component needs it
  };
  closing: {
    thanks: string;
    wishes: string;
  };
  gift: {
    title: string;
    subtitle: string;
    bniName: string;
    bcaName: string;
    copyText: string;
    copiedText: string;
  };
  weddingWish: {
    title: string;
    subtitle: string;
    nameLabel: string;
    messageLabel: string;
    placeholder: string;
    submitButton: string;
    successMessage: string;
    emptyMessage: string;
  };
  rsvp: {
    title: string;
    subtitle: string;
    nameLabel: string;
    attendanceLabel: string;
    attendanceOptions: {
      present: string;
      absent: string;
    };
    guestCountLabel: string;
    messageLabel: string;
    submitButton: string;
    successMessage: string;
    whatsappMessage: string;
  };
}

export interface SiteContent {
  EN: TranslationSet;
  ID: TranslationSet;
}
