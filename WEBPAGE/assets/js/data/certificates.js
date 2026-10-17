/* ==========================================================================
   CERTIFICATES DATA — edit this file to add, remove or change entries.
   Fields:  type: "degree" | "certificate"   title, issuer, year
            skills: ["..."]   url: link to the credential ("" = no link)
            placeholder: true  → shows a "Sample" label. Delete it once real.
   ========================================================================== */
(function () {
  "use strict";
  window.__CERTS__ = [
    { type: "degree", title: "Degree Title Goes Here", issuer: "University Name", year: "20XX",
      skills: ["Algorithms", "Databases", "Software design"], url: "", placeholder: true },
    { type: "certificate", title: "Certificate Title Goes Here", issuer: "Issuing Organization", year: "20XX",
      skills: ["Skill one", "Skill two"], url: "", placeholder: true },
    { type: "certificate", title: "Another Certificate Title", issuer: "Another Issuer", year: "20XX",
      skills: ["Skill three"], url: "", placeholder: true }
  ];
})();
