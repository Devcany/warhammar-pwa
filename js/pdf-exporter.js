/**
 * PDF Exporter for Army Lists
 * Uses jsPDF to generate printable army list PDFs
 */

class PDFExporter {
  /**
   * Export army data to PDF
   * @param {Object} armyData - Parsed army data from RosterParser
   * @returns {Promise<void>}
   */
  async exportToPDF(armyData) {
    // Check if jsPDF is loaded
    if (typeof window.jspdf === 'undefined') {
      throw new Error('jsPDF library not loaded');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPos = 20;
    const leftMargin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const bottomMargin = 20;

    // Helper function to check if we need a new page
    const checkNewPage = (requiredSpace = 10) => {
      if (yPos + requiredSpace > pageHeight - bottomMargin) {
        doc.addPage();
        yPos = 20;
        return true;
      }
      return false;
    };

    // Title
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(armyData.name, leftMargin, yPos);
    yPos += 10;

    // Faction & Game System
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`${armyData.faction} • ${armyData.gameSystem}`, leftMargin, yPos);
    yPos += 8;

    // Points
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${armyData.points.current} / ${armyData.points.limit} pts`, leftMargin, yPos);
    yPos += 12;

    // Separator line
    doc.setDrawColor(233, 69, 96); // #e94560
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPos, pageWidth - leftMargin, yPos);
    yPos += 10;

    // Army Rules
    if (armyData.rules && armyData.rules.length > 0) {
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Army Rules', leftMargin, yPos);
      yPos += 7;

      armyData.rules.forEach(rule => {
        checkNewPage(15);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(rule.name, leftMargin + 5, yPos);
        yPos += 5;

        if (rule.description) {
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          const descLines = doc.splitTextToSize(rule.description, pageWidth - leftMargin * 2 - 10);
          descLines.forEach(line => {
            checkNewPage();
            doc.text(line, leftMargin + 5, yPos);
            yPos += 4;
          });
        }
        yPos += 3;
      });

      yPos += 5;
    }

    // Units
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    checkNewPage(40);
    doc.text('Units', leftMargin, yPos);
    yPos += 10;

    armyData.units.forEach((unit, index) => {
      checkNewPage(35);

      // Unit box background
      doc.setFillColor(240, 240, 245);
      doc.rect(leftMargin, yPos - 5, pageWidth - leftMargin * 2, 8, 'F');

      // Unit name and points
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text(unit.name, leftMargin + 2, yPos);

      const pointsText = `${unit.points} pts`;
      const pointsWidth = doc.getTextWidth(pointsText);
      doc.text(pointsText, pageWidth - leftMargin - pointsWidth - 2, yPos);
      yPos += 8;

      // Model count
      if (unit.modelCount > 1) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text(`${unit.modelCount} model${unit.modelCount > 1 ? 's' : ''}`, leftMargin + 2, yPos);
        yPos += 6;
      }

      // Stats
      if (unit.stats && Object.keys(unit.stats).length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        const statsText = Object.entries(unit.stats)
          .map(([key, value]) => `${key}:${value}`)
          .join('  ');
        doc.text(statsText, leftMargin + 2, yPos);
        yPos += 7;
      }

      // Weapons
      if (unit.weapons && unit.weapons.length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Weapons:', leftMargin + 2, yPos);
        yPos += 5;

        unit.weapons.forEach(weapon => {
          checkNewPage();
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');

          let weaponText = `  • ${weapon.name}`;
          if (weapon.type === 'ranged') {
            weaponText += ` - Range:${weapon.Range || '-'} A:${weapon.A || '-'} BS:${weapon.BS || '-'} S:${weapon.S || '-'} AP:${weapon.AP || '-'} D:${weapon.D || '-'}`;
          } else {
            weaponText += ` - Melee A:${weapon.A || '-'} WS:${weapon.WS || '-'} S:${weapon.S || '-'} AP:${weapon.AP || '-'} D:${weapon.D || '-'}`;
          }

          if (weapon.Keywords) {
            weaponText += ` [${weapon.Keywords}]`;
          }

          const weaponLines = doc.splitTextToSize(weaponText, pageWidth - leftMargin * 2 - 5);
          weaponLines.forEach(line => {
            checkNewPage();
            doc.text(line, leftMargin + 2, yPos);
            yPos += 4;
          });
        });
        yPos += 2;
      }

      // Abilities
      if (unit.abilities && unit.abilities.length > 0) {
        checkNewPage(10);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('Abilities:', leftMargin + 2, yPos);
        yPos += 5;

        unit.abilities.forEach(ability => {
          checkNewPage();
          doc.setFontSize(9);
          doc.setFont('helvetica', 'italic');
          doc.text(`  • ${ability.name}`, leftMargin + 2, yPos);
          yPos += 4;
        });
        yPos += 2;
      }

      yPos += 5;
    });

    // Footer
    const totalPages = doc.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150);
      doc.text(
        `Generated by WarhammAR • Page ${i} of ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      );
    }

    // Save PDF
    const fileName = `${armyData.name.replace(/[^a-z0-9]/gi, '_')}.pdf`;
    doc.save(fileName);
  }

  /**
   * Generate preview (returns data URL instead of downloading)
   * @param {Object} armyData - Parsed army data
   * @returns {Promise<string>} Data URL of PDF
   */
  async generatePreview(armyData) {
    if (typeof window.jspdf === 'undefined') {
      throw new Error('jsPDF library not loaded');
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Same generation logic but return as data URL
    // (simplified for preview)
    doc.setFontSize(20);
    doc.text(armyData.name, 20, 20);
    doc.setFontSize(12);
    doc.text(`${armyData.points.current} / ${armyData.points.limit} pts`, 20, 30);

    return doc.output('dataurlstring');
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PDFExporter;
}
